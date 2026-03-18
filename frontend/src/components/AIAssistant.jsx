import { FaRobot } from "react-icons/fa";

function AIAssistant() {

  const openAssistant = () => {
    alert("AI Assistant Coming Soon");
  };

  return (
    <div
      onClick={openAssistant}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        background: "linear-gradient(135deg, #22c55e, #8b5cf6, #3b82f6)",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "28px",
        color: "white"
      }}
    >
      <FaRobot />
    </div>
  );
}

export default AIAssistant;