import { getErrorMessage } from "@shared/utils/error";

jest.mock("@locales/i18n", () => ({
  __esModule: true,
  default: {
    t: jest.fn((key: string) => `[translated] ${key}`),
  },
}));

describe("getErrorMessage", () => {
  it("returns error.message if input is Error", () => {
    const error = new Error("Something failed");
    expect(getErrorMessage(error)).toBe("Something failed");
  });

  it("returns string if input is string", () => {
    expect(getErrorMessage("network down")).toBe("[translated] errors.unknown");
  });

  it("returns stringified number", () => {
    expect(getErrorMessage(404)).toBe("[translated] errors.unknown");
  });

  it("returns translated unknown message for undefined", () => {
    expect(getErrorMessage(undefined)).toBe("[translated] errors.unknown");
  });

  it("returns translated unknown message for null", () => {
    expect(getErrorMessage(null)).toBe("[translated] errors.unknown");
  });

  it("returns translated unknown message for object", () => {
    expect(getErrorMessage({})).toBe("[translated] errors.unknown");
  });

  it("returns translated unknown message for [object Object]", () => {
    expect(getErrorMessage("[object Object]")).toBe(
      "[translated] errors.unknown"
    );
  });
});
