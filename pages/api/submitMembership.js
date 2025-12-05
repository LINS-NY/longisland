// pages/api/submitMembership.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const APPS_SCRIPT_WEBAPP = process.env.APPS_SCRIPT_WEBAPP || 'https://script.google.com/macros/s/AKfycbzX5qcCqld6in5M1D9dg1uFVYR5oO04QA2RGaE2wRJZAAZDq_neOfaD1t70FurF_dXS/exec';

  if (!APPS_SCRIPT_WEBAPP) {
    console.error('Missing APPS_SCRIPT_WEBAPP environment variable.');
    return res.status(500).json({ status: 'error', message: 'Missing Apps Script URL on server (set APPS_SCRIPT_WEBAPP in environment)' });
  }

  // Basic sanity check for body
  if (!req.body || Object.keys(req.body).length === 0) {
    console.warn('Empty request body forwarded to proxy');
    // still forward, but warn
  }

  // Timeout helper
  const controller = new AbortController();
  const timeoutMs = 30_000; // 30s
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const appsRes = await fetch(APPS_SCRIPT_WEBAPP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const text = await appsRes.text();
    console.log('Apps Script status:', appsRes.status);
    console.log('Apps Script body preview:', (text || '').slice(0, 2000));

    // If Apps Script returned non-2xx, include body in response for diagnostics
    if (!appsRes.ok) {
      // try parse JSON for structured error
      try {
        const json = JSON.parse(text || '{}');
        return res.status(appsRes.status).json({ status: 'error', upstream: json });
      } catch {
        return res.status(appsRes.status).json({ status: 'error', upstreamText: text || `Apps Script returned ${appsRes.status} with empty body` });
      }
    }

    // Success path: try parse JSON, otherwise return raw text
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(text || '');
    }
  } catch (err) {
    clearTimeout(timeout);
    console.error('Proxy error forwarding to Apps Script:', err);
    const isAbort = err.name === 'AbortError';
    return res.status(502).json({
      status: 'error',
      message: isAbort ? `Request to Apps Script timed out after ${timeoutMs}ms` : 'Proxy error forwarding to Apps Script',
      detail: err.message || String(err)
    });
  }
}
