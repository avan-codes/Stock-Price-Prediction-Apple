import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import { useLocalStorage } from './hooks/useLocalStorage';

const Home = lazy(() => import('./pages/Home'));
const Predict = lazy(() => import('./pages/Predict'));
const History = lazy(() => import('./pages/History'));

function LoadingScreen() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Spinner className="h-5 w-5" />
        Loading...
      </div>
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useLocalStorage('stocksight-history', []);

  function saveEntry(entry) {
    const item = {
      id: Date.now(),
      timestamp: Date.now(),
      last100: entry.last100.slice(0, 8),
      n_days: entry.n_days,
      predictions: entry.predictions,
      plot: entry.plot || '',
    };
    setHistory((prev) => [...prev, item]);
  }

  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict onSaved={saveEntry} />} />
          <Route path="/history" element={<History history={history} setHistory={setHistory} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
