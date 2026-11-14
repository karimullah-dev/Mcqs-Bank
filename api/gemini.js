const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions";

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed. Use POST." } });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const apiKey = (body.apiKey || process.env.GEMINI_API_KEY || "").trim();
    const payload = body.payload ? body.payload : { ...body };

    if (!apiKey) {
      return res.status(400).json({ error: { message: "Missing Gemini API key." } });
    }

    if (!body.payload && payload.apiKey) {
      delete payload.apiKey;
    }

    const upstream = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (_) {
      data = { error: { message: text || `Upstream HTTP ${upstream.status}` } };
    }

    return res.status(upstream.status).json(data);
  } catch (error) {
    return res.status(502).json({
      error: { message: error?.message || "Failed to reach Gemini API from Vercel proxy." },
    });
  }
};
