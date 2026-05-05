# Stock Sight Frontend

A premium black-and-white frontend for a stock price prediction API built with Vite, React, Tailwind CSS, React Router v6, and Axios.

## Features

- Home page with premium hero section
- Prediction form with validation for exactly 100 prices
- API integration for forecasts and optional chart image
- Local history storage with expandable cards
- Responsive, minimal black-and-white UI

## Setup

```bash
npm install
npm run dev
```

## Environment

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

If not provided, the app falls back to `http://localhost:8000`.

## API Contract

### Request

`POST /predict`

```json
{
  "last_100": [100.5, ............, 102.3, 101.8],
  "n_days": 30
}
```

Append `?return_plot=true` when the chart checkbox is enabled.

### Expected Response

```json
{
  "predictions": [101.2, 102.4],
  "plot": "data:image/png;base64,..."
}
```

The frontend also supports `predicted_prices` or `image` as fallback keys.

## Notes

- History is stored in `localStorage`.
- The UI uses only Tailwind CSS and custom minimal components.
- The app is lazy-loaded by route for better performance.
