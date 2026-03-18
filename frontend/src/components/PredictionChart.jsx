// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement
// } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// function PredictionChart({ predictions }) {

//   const data = {
//     labels: predictions.map((_, i) => i + 1),
//     datasets: [
//       {
//         label: "Predicted Stock Price",
//         data: predictions,
//         borderColor: "#8b5cf6", // purple
//         backgroundColor: "#22c55e", // green
//         pointBackgroundColor: "#3b82f6", // blue
//       },
//     ],
//   };

//   return <Line data={data} />;
// }

// export default PredictionChart;