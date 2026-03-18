import React, { useState } from "react";
import axios from "axios";

const FetchedData = () => {
  const [lastValues, setLastValues] = useState("");
  const [days, setDays] = useState(30);
  const [predictions, setPredictions] = useState([]);
  const [plot, setPlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setError("");
    setPlot("");
    setPredictions([]);
    setLoading(true);

    try {
      const last100Array = lastValues
        .split(",")
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v));

      if (last100Array.length < 100) {
        setError("You must provide at least 100 valid numbers.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://prediction-of-stocks-app-latest.onrender.com/predict?return_plot=true",
        {
          last_100: last100Array.slice(-100),
          n_days: Number(days),
        }
      );

      setPlot(response.data.plot || "");
      setPredictions(response.data.predictions || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching predictions. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!predictions || predictions.length === 0) return;

    const header = "Day,Price\n";
    const rows = predictions
      .map((price, idx) => {
        const val = typeof price === "number" ? price : parseFloat(price);
        return `${idx + 1},${isNaN(val) ? "" : val}`;
      })
      .join("\n");

    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "predictions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadImage = () => {
    if (!plot) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${plot}`;
    link.download = "prediction_plot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerStyle = {
    padding: "30px 16px",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "auto",
  };

  const textareaStyle = {
    width: "100%",
    maxWidth: "700px",
    height: "120px",
    padding: "10px",
    background:
      "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(139,92,246,0.06), rgba(59,130,246,0.06))",
    color: "white",
    border: "1px solid rgba(168,85,247,0.45)",
    borderRadius: 8,
  };

  const inputStyle = {
    padding: "10px",
    width: "100%",
    maxWidth: "220px",
    background:
      "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(139,92,246,0.06), rgba(59,130,246,0.06))",
    color: "white",
    border: "1px solid rgba(168,85,247,0.45)",
    borderRadius: 8,
  };

  const tableWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    maxWidth: "760px",
    margin: "20px auto",
  };

  const tableStyle = {
    margin: "auto",
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid #a855f7",
  };

  const thTdStyle = {
    padding: "8px 12px",
    border: "1px solid #a855f7",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 className="pb-5 text-xl md:text-2xl">Stock Prediction Input Data</h2>

      <div style={{ marginBottom: "20px" }}>
        <textarea
          id="predict"
          className="rounded-lg backdrop-blur-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter last 100+ closing prices, comma-separated"
          value={lastValues}
          onChange={(e) => setLastValues(e.target.value)}
          style={textareaStyle}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Days to predict"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={inputStyle}
          min={1}
          max={180}
          className="rounded-lg backdrop-blur-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <br />
        <br />

        <button
          onClick={handleFetch}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #22c55e, #8b5cf6, #3b82f6)",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Predict
        </button>
      </div>

      {loading && <p>Loading predictions...</p>}
      {error && <p style={{ color: "#c084fc" }}>{error}</p>}

      {plot && (
        <div
          style={{
            marginTop: "20px",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3>Prediction Plot</h3>

          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={`data:image/png;base64,${plot}`}
              alt="Prediction Plot"
              style={{
                width: "100%",
                maxWidth: "900px",
                display: "block",
                borderRadius: 6,
              }}
            />

            <button
              onClick={downloadImage}
              style={{
                position: "absolute",
                right: 12,
                bottom: 12,
                padding: "8px 12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                background: "linear-gradient(135deg, #22c55e, #8b5cf6, #3b82f6)",
                color: "white",
              }}
            >
              Download Image
            </button>
          </div>
        </div>
      )}

      {predictions.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "20px auto" }}>
          <h3>Prediction Table</h3>

          <div style={tableWrapperStyle}>
            <div style={{ flex: "1 1 500px", minWidth: "260px" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thTdStyle}>Day</th>
                    <th style={thTdStyle}>Price Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((price, index) => (
                    <tr key={index}>
                      <td style={thTdStyle}>{index + 1}</td>
                      <td style={thTdStyle}>{Number(price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                width: "180px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                flex: "1 1 150px",
              }}
            >
              <button
                onClick={downloadCSV}
                style={{
                  padding: "10px 12px",
                  background: "linear-gradient(135deg, #22c55e, #8b5cf6, #3b82f6)",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Download as CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchedData;
