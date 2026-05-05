import { useMemo, useState } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { CheckIcon } from '../components/Icons';
import { predictStock } from '../lib/api';
import { validateLast100 } from '../lib/validators';

const SAMPLE_DATA = `150,151,149,152,156,153,155,159,157,160,158,162,159,164,166,163,167,165,168,170,169,173,170,174,177,173,178,176,180,177,181,179,183,186,182,185,189,187,190,188,192,189,193,196,192,195,198,194,197,200,198,203,199,204,207,202,206,209,205,208,211,209,213,210,215,212,217,214,218,216,221,219,222,220,224,227,223,226,229,225,230,228,232,229,234,237,233,236,239,235,240,238,242,239,244,247,243,246,249,245`;

export default function Predict({ onSaved }) {
  const [last100Text, setLast100Text] = useState('');
  const [nDays, setNDays] = useState(30);
  const [includeChart, setIncludeChart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const validation = useMemo(() => validateLast100(last100Text), [last100Text]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    const n = Number(nDays);
    if (!Number.isInteger(n) || n < 1 || n > 180) {
      setError('Days to forecast must be between 1 and 180.');
      return;
    }

    setLoading(true);
    try {
      const data = await predictStock({
        last_100: validation.values,
        n_days: n,
        return_plot: includeChart,
      });

      const predictions = Array.isArray(data.predictions)
        ? data.predictions
        : Array.isArray(data.predicted_prices)
          ? data.predicted_prices
          : [];

      const plot = data.plot || data.image || '';
      const normalized = { predictions, plot };
      setResult(normalized);
      onSaved?.({
        n_days: n,
        last100: validation.values,
        predictions,
        plot: includeChart ? plot : '',
      });
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        'Unable to generate forecast right now.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setLast100Text('');
    setNDays(30);
    setIncludeChart(true);
    setError('');
    setResult(null);
  }

  function loadSample() {
    setLast100Text(SAMPLE_DATA);
    setError('');
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Predict
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tighter text-black sm:text-5xl">
            Make a Prediction
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Paste the last 100 closing prices, choose the forecast window, and generate a clean
            result set.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-semibold text-black">
                Last 100 Closing Prices
              </label>
              <button
                type="button"
                onClick={loadSample}
                className="text-sm font-medium text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-black"
              >
                Use sample data
              </button>
            </div>
            <textarea
              value={last100Text}
              onChange={(e) => setLast100Text(e.target.value)}
              placeholder="100.5, 102.3, 101.8, 99.7, 98.2..."
              rows={8}
              className="input-base mt-3 resize-none leading-7"
            />
            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
              <div
                className={
                  validation.valid
                    ? 'flex items-center gap-2 text-green-700'
                    : 'text-gray-500'
                }
              >
                {validation.valid ? <CheckIcon className="h-4 w-4" /> : null}
                <span>{validation.message}</span>
              </div>
              <span className="text-gray-400">Separated by comma, space, or newline</span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-black">Days to forecast</label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={nDays}
                  onChange={(e) => setNDays(Number(e.target.value))}
                  className="input-base mt-3"
                />
              </div>
              <div className="flex items-end">
                <label className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-black">
                  <input
                    type="checkbox"
                    checked={includeChart}
                    onChange={(e) => setIncludeChart(e.target.checked)}
                    // FIX 2: ensure the custom checkmark scales properly inside the 16px box
                    className="h-4 w-4 appearance-none rounded border border-black bg-white 
                               checked:bg-black checked:bg-center checked:bg-no-repeat
                               checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m20%206-11%2011-5-5%22/%3E%3C/svg%3E')]
                               checked:bg-[length:1rem]"
                  />
                  Include chart
                </label>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="submit" disabled={loading} className="btn-primary min-w-44">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner />
                    Generating...
                  </span>
                ) : (
                  'Generate Forecast'
                )}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Reset
              </button>
            </div>

            <div className="mt-6">
              <Alert message={error} onDismiss={() => setError('')} />
            </div>
          </form>

          <div className="space-y-6">
            <div className="card-base p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-black">Result area</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Forecast table and optional chart will appear here after a successful API response.
              </p>
              {result?.plot ? (
                <img
                  src={`data:image/png;base64,${result.plot}`}
                  alt="Prediction chart"
                  className="w-full rounded-2xl border border-gray-200 shadow-soft"
                />
              ) : null}

              {result ? (
                <div className="mt-6 space-y-6">
                  {/* FIX 3: only render the table when there are predictions */}
                  {result.predictions.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead className="bg-black text-white">
                          <tr>
                            <th className="px-4 py-3 font-medium">Day</th>
                            <th className="px-4 py-3 font-medium">Predicted Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.predictions.map((price, index) => (
                            <tr
                              key={`${index}-${price}`}
                              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                            >
                              <td className="px-4 py-3 text-gray-700">Day {index + 1}</td>
                              <td className="px-4 py-3 font-medium text-black">
                                {Number(price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center text-sm text-gray-500">
                  No forecast generated yet.
                </div>
              )}
            </div>

            {/* <div className="card-base p-6 text-sm leading-7 text-gray-600 sm:p-8">
              <p className="font-semibold text-black">API contract</p>
              <p className="mt-2">
                POST /predict with{' '}
                <span className="font-medium text-black">
                  {`{ last_100: number[], n_days: number }`}
                </span>
              </p>
              <p className="mt-1">
                Add <span className="font-medium text-black">?return_plot=true</span> to fetch a
                chart image.
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}