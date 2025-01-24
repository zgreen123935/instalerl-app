import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Serve static files from dist directory
app.use(express.static('dist'));

// Health check endpoint
app.get('/health', (req, res) => res.send('OK'));

// Proxy Airtable requests for all records
app.get('/api/records', async (req, res) => {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Airtable Error:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`Airtable request failed: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy Error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch data from Airtable',
      details: err.message 
    });
  }
});

// Proxy Airtable requests for single record
app.get('/api/records/:id', async (req, res) => {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}/${req.params.id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Site not found' });
      }
      throw new Error(`Airtable request failed: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy Error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch site details from Airtable',
      details: err.message 
    });
  }
});

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
