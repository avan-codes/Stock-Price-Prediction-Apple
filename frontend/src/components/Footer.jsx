import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-purple-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">

        {/* Brand */}
        <h2 className="text-xl font-semibold bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Stock.sight
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          AI-powered stock price prediction platform using machine learning and
          time-series models to forecast market trends with visual insights.
        </p>

        {/* Links */}
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <a href=""  className="hover:text-green-500 transition">Github</a>
          {/* <a className="hover:text-purple-500 transition"> Docker Image</a> */}
          <a href="" className="hover:text-blue-500 transition">Project Report</a>
        </div>

        {/* Bottom line */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Stock.sight
        </div>

      </div>
    </footer>
  );
}

export default Footer;