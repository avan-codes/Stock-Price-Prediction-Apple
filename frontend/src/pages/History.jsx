import { Link } from 'react-router-dom';
import HistoryCard from '../components/HistoryCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function History({ history: historyProp, setHistory: setHistoryProp }) {
  const [localHistory, setLocalHistory] = useLocalStorage('stocksight-history', []);
  const history = historyProp ?? localHistory;
  const setHistory = setHistoryProp ?? setLocalHistory;

  function deleteItem(id) {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }

  function clearAll() {
    setHistory([]);
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">History</p>
            <h1 className="mt-3 text-4xl font-black tracking-tighter text-black sm:text-5xl">Prediction History</h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">Every successful forecast is saved locally so you can reopen and inspect it later.</p>
          </div>
          {history.length > 0 ? (
            <button type="button" onClick={clearAll} className="btn-secondary self-start sm:self-auto">
              Clear all
            </button>
          ) : null}
        </div>

        <div className="mt-10 space-y-5">
          {history.length > 0 ? (
            history
              .slice()
              .reverse()
              .map((item) => <HistoryCard key={item.id} item={item} onDelete={deleteItem} />)
          ) : (
            <div className="card-base flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-black">No predictions yet. Create your first forecast.</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600">Run a prediction and the result will appear here automatically.</p>
              <Link to="/predict" className="btn-primary mt-6">Go to Predict</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
