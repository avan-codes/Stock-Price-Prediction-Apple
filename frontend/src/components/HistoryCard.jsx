import { useMemo, useState } from 'react';
import { ArrowIcon, CheckIcon, ClockIcon, TrashIcon } from './Icons';
import { formatDateTime } from '../lib/validators';

function MiniTable({ predictions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-4 py-3 font-medium">Day</th>
            <th className="px-4 py-3 font-medium">Predicted Price</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((price, index) => (
            <tr key={`${index}-${price}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 text-gray-700">Day {index + 1}</td>
              <td className="px-4 py-3 font-medium text-black">{Number(price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HistoryCard({ item, onDelete }) {
  const [open, setOpen] = useState(false);
  const preview = useMemo(() => item.predictions.slice(0, 4).map((v) => Number(v).toFixed(2)).join(', '), [item.predictions]);

  return (
    <div className="card-base overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
            <ClockIcon className="h-4 w-4" />
            {formatDateTime(item.timestamp)}
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-black">{item.n_days} day forecast</h3>
          <p className="mt-1 text-sm text-gray-600">Preview: {preview}{item.predictions.length > 4 ? '…' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
            <CheckIcon className="h-3.5 w-3.5" />
            Saved
          </span>
          <span className={`transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}>
            <ArrowIcon />
          </span>
        </div>
      </button>

      <div
        className="overflow-hidden border-t border-gray-200 transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? '2000px' : '0px' }}
      >
        <div className="space-y-5 p-5">
          <MiniTable predictions={item.predictions} />
          {item.plot ? (
            <img
              src={item.plot}
              alt="Prediction chart"
              className="w-full rounded-2xl border border-gray-200 shadow-sm"
            />
          ) : null}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-black hover:text-black"
            >
              <TrashIcon />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
