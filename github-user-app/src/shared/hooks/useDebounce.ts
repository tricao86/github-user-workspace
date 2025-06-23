import { useEffect, useState } from "react";

/**
 * Custom hook for debouncing a value.
 * It returns the value only after the specified delay has passed
 * without the value being updated again.
 *
 * @param value The input value to debounce.
 * @param delay The debounce delay in milliseconds (default: 500ms).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    // Clear the timeout if the value changes before the delay ends
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
