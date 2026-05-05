import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://stock-sight-pranjal-main.onrender.com';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export async function predictStock({ last_100, n_days, return_plot }) {
  const url = return_plot ? '/predict?return_plot=true' : '/predict';
  const response = await api.post(url, { last_100, n_days });
  return response.data;
}
