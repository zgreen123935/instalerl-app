# Installer App

A Vue.js application for managing installation sites and work orders.

## Features

- Airtable integration for site data
- Clean, responsive UI for viewing sites
- Status indicators for work orders
- Detailed site information display

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Airtable credentials:
   ```
   VITE_AIRTABLE_KEY=your_airtable_key_here
   VITE_AIRTABLE_BASE_ID=your_base_id_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is configured for automatic deployment on DigitalOcean's App Platform.
