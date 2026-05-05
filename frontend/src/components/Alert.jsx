import { XIcon } from './Icons';

export default function Alert({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full border border-black p-1">
          <span className="block h-2 w-2 rounded-full bg-black" />
        </div>
        <p>{message}</p>
      </div>
      <button type="button" onClick={onDismiss} className="rounded-full p-1 text-gray-500 transition-colors hover:text-black" aria-label="Dismiss alert">
        <XIcon />
      </button>
    </div>
  );
}
