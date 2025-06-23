import i18n from "@locales/i18n";

jest.mock("@locales/i18n", () => ({
  __esModule: true, // Important for ES modules
  use: jest.fn(() => ({
    init: jest.fn(),
  })),
  init: jest.fn(),
  default: {
    t: (key: string) => `[translated] ${key}`, // Basic mock for translation function
    language: "en",
  },
}));

describe("i18n.ts", () => {
  it("should have default language as en", () => {
    expect(i18n.language).toBe("en");
  });

  it("translates known key", () => {
    expect(i18n.t("errors.unknown")).toBe("[translated] errors.unknown");
  });
});
