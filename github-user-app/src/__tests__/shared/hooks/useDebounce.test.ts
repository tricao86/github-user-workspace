import { useDebounce } from "@shared/hooks/useDebounce";
import { renderHook } from "@testing-library/react";
import { act } from "react";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("debounce", 500));
    expect(result.current).toBe("debounce");
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "a", delay: 500 },
      }
    );

    // Immediately after value change, debounced value should not change
    rerender({ value: "ab", delay: 500 });
    expect(result.current).toBe("a");

    // Advance time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now value should be updated
    expect(result.current).toBe("ab");
  });

  it("should cancel previous timer on new input", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "one", delay: 300 },
      }
    );

    rerender({ value: "two", delay: 300 });
    act(() => jest.advanceTimersByTime(150)); // halfway

    rerender({ value: "three", delay: 300 });
    act(() => jest.advanceTimersByTime(150)); // still not complete

    // Should still return 'one'
    expect(result.current).toBe("one");

    act(() => jest.advanceTimersByTime(300)); // now apply 'three'
    expect(result.current).toBe("three");
  });
});
