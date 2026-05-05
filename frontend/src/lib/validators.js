export function parseNumbers(input) {
  return input
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item));
}

export function validateLast100(input) {
  const values = parseNumbers(input);

  if (!input.trim()) {
    return { values: [], valid: false, message: 'Paste 100 closing prices.' };
  }

  if (values.some((n) => Number.isNaN(n) || !Number.isFinite(n))) {
    return { values, valid: false, message: 'Only valid numbers are allowed.' };
  }

  if (values.length !== 100) {
    return { values, valid: false, message: `${values.length}/100 values entered` };
  }

  return { values, valid: true, message: '100 values ready' };
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}
