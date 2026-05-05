import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import { ChartIcon, ClockIcon, SparkIcon } from '../components/Icons';

export default function Home() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
              <SparkIcon className="h-4 w-4" />
              AI stock forecasting
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tighter text-black sm:text-6xl lg:text-7xl">
              AI‑Powered Stock Forecasting
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              Predict future prices using the last 100 days of data. Simple, fast, and beautifully visual.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/predict" className="btn-primary">Start Now</Link>
              <Link to="/history" className="btn-secondary">View History</Link>
            </div>
          </div>

          <div className="card-base overflow-hidden">
            <div className="border-b border-gray-200 bg-black px-6 py-5 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-300">Forecast panel</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">Minimal, sharp, built to feel premium.</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 inline-flex rounded-full border border-black p-2"><ClockIcon /></div>
                  <div className="text-sm font-semibold">100 days</div>
                  <p className="mt-1 text-sm text-gray-600">Last 100 closing prices in, forecast out.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 inline-flex rounded-full border border-black p-2"><ChartIcon /></div>
                  <div className="text-sm font-semibold">Chart view</div>
                  <p className="mt-1 text-sm text-gray-600">Preview predictions with a clean rendered plot.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 inline-flex rounded-full border border-black p-2"><SparkIcon /></div>
                  <div className="text-sm font-semibold">Replay history</div>
                  <p className="mt-1 text-sm text-gray-600">Save and revisit past forecasts locally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<ClockIcon />}
            title="Last 100 Days Analysis"
            description="Paste exactly 100 closing prices and get a forecast-ready payload with strong client-side validation."
          />
          <FeatureCard
            icon={<ChartIcon />}
            title="Interactive Prediction Chart"
            description="When enabled, the backend plot is shown directly as a base64 image for instant visual review."
          />
          <FeatureCard
            icon={<SparkIcon />}
            title="History & Replay"
            description="Every forecast is saved locally so you can expand, inspect, and delete it without leaving the app."
          />
        </div>
      </section>
    </div>
  );
}
