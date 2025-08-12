// netlify/functions/fetchSheetData.js

export async function handler(event) {
  // Step 1: Netlify environment variables se credentials hasil karein.
  // Note: Yahan istemal kiye gaye naam (SHEET_ID, API_KEY) Netlify UI mein set kiye gaye naamo se bilkul match hone chahiye.
  const SHEET_ID = process.env.SHEET_ID;
  const API_KEY = process.env.API_KEY;

  if (!SHEET_ID || !API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API credentials. Check your Netlify environment variables." }),
    };
  }

  // Step 2: Frontend se bheja gaya 'tab' parameter hasil karein.
  const tab = event.queryStringParameters.tab;
  if (!tab) {
    return {
      statusCode: 400, // Bad Request
      body: JSON.stringify({ error: "Request mein 'tab' query parameter missing hai." }),
    };
  }
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tab}!A1:Z1000?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Google Sheets API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
