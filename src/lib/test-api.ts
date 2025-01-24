const API_KEY = 'patdO1RLKkgBMsvtJ.b293998bbfed44737014eb9922ce07f4aa212f22bfee73c30fe43f07e76f7f25';
const BASE_ID = 'appEL9Y26LvV46RbB';

// First, let's just try to list the tables in the base
export async function listTables() {
  const url = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data:', data);

    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}
