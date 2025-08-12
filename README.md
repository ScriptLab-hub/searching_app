# Book Search App (Google Sheets Edition)

This is a simple web application that fetches book data from a Google Sheet, allowing users to find books by writer and category. The primary goal of this project is to demonstrate the use of Netlify Functions with the Google Sheets API.

**Live Demo:** [https://searchingappsmit.netlify.app/]

---

## ✨ Features

-   **Dynamic Data:** All data (Writers, Categories, Books) is fetched live from a Google Sheet.
-   **Cascading Dropdowns:** Select a writer to dynamically populate the relevant categories.
-   **Secure API Handling:** The Google API Key is kept secure on the backend using Netlify Functions, never exposed to the client-side.
-   **Improved UX:** Displays a loading spinner while fetching data and shows user-friendly error messages.
-   **Responsive Design:** Built with Tailwind CSS for a great experience on both mobile and desktop.
-   **Fast Loading:** Utilizes `Promise.all` to fetch all initial data in parallel, leading to a faster page load.

---

## 🛠️ Tech Stack

-   **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
-   **Backend (Serverless):** Netlify Functions
-   **Database:** Google Sheets API

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the project on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd searching_app
```

### 2. Netlify CLI Install Karein

Agar aap ke paas Netlify CLI install nahi hai, to yeh command chalayein:
```bash
npm install netlify-cli -g
```

### 3. Environment Variables Set Karein

Project ke root folder mein ek nayi file banayein aur uska naam `.env` rakhein. Is mein apni Google Sheet ID aur API Key likhein:

```
# .env file
SHEET_ID=your sheet id 
API_KEY=your google api key 
```

Got it — I’ll make you a **complete README** that explains exactly how to set up your frontend to fetch data from Google Sheets **without exposing your API key**, using **Netlify environment variables** and a **Netlify serverless function**.

Here’s the full README:

---

# 📄 Google Sheets + Netlify Serverless Function (Secure API Key)

This project fetches data from a **Google Sheet** securely, using **Netlify Functions** to keep your API key hidden.

---

## 🚀 Features

* Fetches data from a **public or private Google Sheet**.
* Hides **API key** using Netlify **Environment Variables**.
* Uses **Netlify Functions** to act as a backend API proxy.
* Deployable directly to Netlify.

---

## 📂 Project Structure

```
.
├── netlify/functions/get-sheet-data.js   # Serverless function
├── public/                               # Static assets
├── src/                                  # Frontend files
│   ├── index.html
│   ├── script.js
├── package.json
└── README.md
```

---

## 🔑 Step 1: Enable Google Sheets API & Get Credentials

1. Go to **Google Cloud Console** → [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Enable **Google Sheets API**.
3. Create a new **API Key**.
4. Note your **Spreadsheet ID** — from the sheet URL:

   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

---

## 📦 Step 2: Store Secrets in Netlify Environment Variables

In your project root, run:

```sh
netlify init
```

Then set environment variables:

```sh
netlify env:set GOOGLE_SHEETS_API_KEY your_api_key_here
netlify env:set GOOGLE_SHEET_ID your_sheet_id_here
```

---

## 🖥 Step 3: Create Netlify Serverless Function

**`netlify/functions/get-sheet-data.js`**

```javascript
import fetch from "node-fetch";

export async function handler() {
  try {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:Z1000?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

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
```

---

## 🎨 Step 4: Fetch Data from Frontend

**`src/script.js`**

```javascript
async function loadSheetData() {
  try {
    const res = await fetch("/.netlify/functions/get-sheet-data");
    const data = await res.json();
    console.log("Sheet Data:", data);

    // Example: render data in HTML
    document.getElementById("output").innerText = JSON.stringify(data.values, null, 2);
  } catch (err) {
    console.error("Error:", err);
  }
}

loadSheetData();
```

---

**`src/index.html`**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Google Sheets Data</title>
</head>
<body>
  <h1>Google Sheets Data</h1>
  <pre id="output"></pre>
  <script src="./script.js"></script>
</body>
</html>
```

---

## 🔄 Step 5: Deploy to Netlify

```sh
netlify deploy --prod
```

---

## 🛠 Troubleshooting

* **`invalid parameter for function creation: Uploaded file must be a non-empty zip`**
  → Ensure your function file exists inside `netlify/functions/` and is not empty.

* **API Key still exposed?**
  → Check that your frontend **never** calls Google Sheets API directly — always call the Netlify function.

---

## ✅ Summary

* **Frontend** calls → `/.netlify/functions/get-sheet-data`
* **Backend (Netlify function)** fetches Google Sheets data using **hidden API key**.
* **API key is never exposed** to the browser.

---


