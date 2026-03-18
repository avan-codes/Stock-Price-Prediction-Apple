import { useCallback, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer"
import FetchedData from "./components/FetchedData";
// import PredictionChart from "./components/PredictionChart";
import PlotImage from "./components/PlotImage";

function App() {
  const [predictions, setPredictions] = useState([]);
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  

  const getPredictions = useCallback(async (valuesArray, daysToPredict, returnPlot = true) => {
    setApiError(null);
    setLoading(true);
    try {
      const payload = { values: valuesArray, days: parseInt(daysToPredict, 10) };
      const res = await fetch("http://127.0.0.1:8000/predict?return_plot=" + (returnPlot ? "true" : "false"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      const respPreds = Array.isArray(data.predictions) ? data.predictions : [];
      const respPlot = data.plot || null;
      return { predictions: respPreds, plot: respPlot };
    } catch (err) {
      console.error(err);
      setApiError(err.message || "API error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResult = ({ predictions, plot }) => {
    setPredictions(predictions || []);
    setPlot(plot || null);
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="flex-1">
            <div className="mb-6 flex items-start justify-center gap-4">
              <div className="items">
                <div className="max-w-2xl justify-center itemce">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                     Stock Price Predictor
                  </h1>

                  <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Paste your last <span className="font-semibold text-green-500">N closing values</span>
                    (comma or newline separated), choose the
                    <span className="font-semibold text-purple-500"> prediction horizon</span> and hit
                    <span className="px-2 py-0.5 mx-1 rounded-md bg-green-500/10 text-green-500 font-semibold">
                      Predict
                    </span>.
                  </p>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    The AI model analyzes historical market patterns and returns
                    <span className="font-semibold"> numerical forecasts</span> along with an
                    <span className="font-semibold"> auto-generated visualization plot</span>
                    to help interpret future trends.
                  </p>
                </div>
              </div>

              {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? (
                  <span>Running model... ⏳</span>
                ) : apiError ? (
                  <span className="text-purple-500">Error: {apiError}</span>
                ) : (
                  <span>Ready</span>
                )}
              </div> */}
            </div>

            <div className="mb-6">
              <FetchedData onResult={handleResult} getPredictions={getPredictions} />
            </div>

            

            {plot && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
                <h3 className="text-lg font-medium mb-3 text-blue-500">Generated Plot</h3>
                <PlotImage base64={plot} alt="Model generated plot" />
              </div>
            )}
          </section>

          {/* <aside className="w-full lg:w-96 flex flex-col gap-6">
            <div className="sticky top-8">
              <AIAssistant predictions={predictions} />
            </div>
          </aside> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;