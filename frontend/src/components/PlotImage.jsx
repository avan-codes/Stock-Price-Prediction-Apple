function PlotImage({ base64 }) {

  const imageSrc = `data:image/png;base64,${base64}`;

  return (
    <div style={{ textAlign: "center" }}>
      <h3
        style={{
          background: "linear-gradient(90deg, #22c55e, #8b5cf6, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "600"
        }}
      >
        Model Generated Plot
      </h3>

      <img
        src={imageSrc}
        alt="prediction plot"
        style={{
          maxWidth: "100%",
          borderRadius: "10px",
          border: "2px solid #8b5cf6"
        }}
      />
    </div>
  );
}

export default PlotImage;