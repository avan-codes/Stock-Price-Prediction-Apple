import React, { useEffect, useState } from "react";
import logo from "./Img/logo.png"

export default function Header() {
    const [dark, setDark] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    // const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm">

            <style>{`
        @keyframes rotateDisappear {
          0% { transform: rotate(0deg) scale(1); opacity: 1; }
          55% { transform: rotate(200deg) scale(1.05); opacity: 1; }
          85% { transform: rotate(360deg) scale(0.95); opacity: 0; }
          100% { transform: rotate(360deg) scale(0.95); opacity: 0; }
        }
        .title-anim {
          animation: rotateDisappear 6s cubic-bezier(.2,.9,.2,1) infinite;
        }
        @keyframes floatY { 0%{transform: translateY(0)} 50%{transform: translateY(-4px)} 100%{transform: translateY(0)} }
        .float { animation: floatY 4s ease-in-out infinite }
      `}</style>

            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet"></link>

            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-green-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <img src={logo} alt="logo" className="rounded-2xl" />

                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                            <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="hidden sm:block">
                        <span className="font-serif text-xl font-semibold tracking-wide">
                            <span className="text-blue-500 text-2xl">S</span>
                            <span className="text-gray-800 dark:text-gray-100">tock</span>
                            <span className="text-purple-500">.</span>
                            <span className="text-green-500">sight</span>
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6"></div>

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setDark((d) => !d)}
                        aria-label="Toggle theme"
                        className="p-2 rounded-md bg-blue-100 dark:bg-gray-800 hover:scale-105 transition-transform"
                    >
                        {dark ? (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M12 3v1M12 20v1M4.2 4.2l.7.7M19.1 19.1l.7.7M1 12h1M22 12h1M4.2 19.8l.7-.7M19.1 4.9l.7-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        )}
                    </button>

                  
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="mb-6">
                    <h1 className="mx-auto text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        <span className="relative inline-block">
                            <span className="title-anim float bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-purple-400 to-blue-400">
                                Stock Sight
                            </span>
                        </span>
                    </h1>

                    <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Real-time stock price predictions and visualizations — clean UI for ML results.
                    </p>
                </div>

                <section className="mt-8 bg-blue-50 dark:bg-gray-800/40 rounded-2xl p-6 md:p-8 shadow-md">
                    <h2 className="text-xl sm:text-2xl font-semibold">About this website</h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                        This platform is a powerful stock price prediction system built for traders and investors. It combines stacked LSTM networks with a suite of modern machine-learning and time-series methods to analyze historical data, market indicators, and news sentiment, producing short- and medium-term forecasts. Users can input custom time frames, view interactive prediction charts with uncertainty bands, backtest strategies, and receive near-real-time updates. The clean, responsive UI makes complex model insights easy to interpret — helping users make smarter, data-driven investment decisions.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href="#predict"><button  className="px-4 py-2 rounded-md   bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 text-white hover:scale-105 transition">
                            Make Predictions
                        </button></a>
                    </div>
                </section>

            </div>
        </header>
    );
}