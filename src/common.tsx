export function unwrap<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new TypeError(message ?? `attempted to unwrap ${value}`);
  } else {
    return value;
  }
}
