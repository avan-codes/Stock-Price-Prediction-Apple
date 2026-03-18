// src/RequestSender.jsx
import React, { useState } from "react";

export default function RequestSender({
  apiUrl = "http://127.0.0.1:8000/predict?return_plot=true",
}) {
  const [last100, setLast100] = useState(
    `132.045, 131.78, 130.28, 130.535, 129.96, 130.12, 129.36, 128.65, 127.8, 127.42, 128.88, 128.59, 127.17, 126.92, 127.6, 127.3, 127.88, 126.6, 127.61, 127.03, 128.11, 127.5, 126.75, 124.53, 125.425, 126.6, 126.44, 126, 125.69, 122.57, 120.07, 123.28, 125.66, 125.61, 126.82, 128.51, 129.62, 132.07, 130.75, 125.22, 125.16, 124.5, 122.77, 123.38, 122.99, 122.37, 121.3, 118.44, 114.64, 115.4, 115.13, 115.52, 119.72, 113.49, 115.24, 115.15, 115.96, 117.16, 116.5, 115.01, 112.65, 105.76, 103.12, 103.74, 109.69, 112.92, 113.29, 112.76, 107.72, 112.34, 110.37, 109.27, 112.31, 110.15, 112.57, 114.21, 115.31, 116.28, 116.41, 113.92, 113.45, 115.21, 113.4, 114.32, 115, 114.71, 112.44, 109.06, 110.3, 109.58, 110.38, 110.78, 111.31, 110.78, 109.5, 112.12, 111.6, 111.79, 110.21, 111.86`
  );
  const [nDays, setNDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState(null);
  const [plotSrc, setPlotSrc] = useState(null);
  const [error, setError] = useState(null);

  // recursively search for base64-like strings in response
  function extractBase64(obj) {
    if (!obj && obj !== 0) return null;
    if (typeof obj === "string") {
      const s = obj.replace(/\s+/g, "");
      if (s.length > 100 && /^[A-Za-z0-9+/=]+$/.test(s)) return s;
      return null;
    }
    if (Array.isArray(obj)) {
      for (const el of obj) {
        const r = extractBase64(el);
        if (r) return r;
      }
    } else if (typeof obj === "object") {
      for (const k in obj) {
        const r = extractBase64(obj[k]);
        if (r) return r;
      }
    }
    return null;
  }

  const handleSend = async () => {
    setError(null);
    setJsonResp(null);
    setPlotSrc(null);

    // parse last100 textarea into array of numbers
    const arr = last100
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !Number.isNaN(n));

    const payload = { last_100: arr, n_days: Number(nDays) || 30 };

    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText} — ${text}`);
      }

      const data = await res.json();
      setJsonResp(data);

      // try to find base64 image in response
      const b64 = extractBase64(data);
      if (b64) {
        // assume PNG; change to image/jpeg if needed
        setPlotSrc(`data:image/png;base64,${b64}`);
      } else if (data.plot_base64) {
        setPlotSrc(`data:image/png;base64,${data.plot_base64}`);
      } else if (data.image_base64) {
        setPlotSrc(`data:image/png;base64,${data.image_base64}`);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const prettyJson = jsonResp ? JSON.stringify(jsonResp, null, 2) : null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-3">RequestSender</h2>

      <label className="block text-sm font-medium">last_100 (comma separated)</label>
      <textarea
        value={last100}
        onChange={(e) => setLast100(e.target.value)}
        rows={6}
        className="w-full rounded-md border p-2 mt-1 mb-3 bg-slate-50 dark:bg-slate-800"
      />

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm">n_days</label>
        <input
          type="number"
          value={nDays}
          onChange={(e) => setNDays(e.target.value)}
          className="w-24 rounded-md border p-2 bg-white dark:bg-slate-700"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-auto px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send POST"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {plotSrc && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Returned plot</h3>
          <img src={plotSrc} alt="plot" className="max-w-full border rounded shadow" />
        </div>
      )}

      {prettyJson && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Full JSON response</h3>
          <pre className="whitespace-pre-wrap rounded border p-3 bg-slate-50 dark:bg-slate-800 text-sm">
            {prettyJson}
          </pre>
        </div>
      )}
    </div>
  );
}