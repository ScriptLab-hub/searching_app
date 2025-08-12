// netlify/functions/fetchSheetData.js

exports.handler = async function (event, context) {
  try {
    const SHEET_ID = process.env.SHEET_ID;
    const API_KEY = process.env.API_KEY;

    if (!SHEET_ID || !API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing API credentials" })
      };
    }

    const tab = event.queryStringParameters?.tab || "Writers";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tab}?key=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Google API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
