// pages/api/submitMembership.js
export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const APPS_SCRIPT_WEBAPP = process.env.APPS_SCRIPT_WEBAPP || '';

  // Clear JSON error if env var missing
  if (!APPS_SCRIPT_WEBAPP) {
    console.error('Missing APPS_SCRIPT_WEBAPP environment variable (local).');
    return res.status(500).json({ status: 'error', message: 'Missing Apps Script URL on server (set APPS_SCRIPT_WEBAPP in .env.local)' });
  }

  try {
    // Forward request body to Apps Script
    const appsRes = await fetch(APPS_SCRIPT_WEBAPP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await appsRes.text();
    // Log status and a preview of the body for local debugging
    console.log('Apps Script status:', appsRes.status);
    console.log('Apps Script body preview:', (text || '').slice(0, 2000));

    // Try to parse JSON; if not JSON, return text
    try {
      const json = JSON.parse(text);
      return res.status(appsRes.status).json(json);
    } catch (parseErr) {
      // Return text body with appropriate content-type
      res.status(appsRes.status).setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.send(text || `Apps Script returned status ${appsRes.status} with empty body`);
    }
  } catch (err) {
    console.error('Proxy error forwarding to Apps Script:', err);
    return res.status(500).json({ status: 'error', message: 'Proxy error forwarding to Apps Script: ' + (err.message || String(err)) });
  }
}
