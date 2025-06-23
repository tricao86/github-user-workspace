import {
  buildGithubSearchBaseUrl,
  buildGithubSearchUrl,
  isRateLimitError,
} from "@shared/utils/network";

jest.mock("@shared/config/env", () => ({
  __esModule: true,
  BASE_URL: "https://api.github.com",
}));

describe("isRateLimitError", () => {
  it("returns true if status is 403", () => {
    expect(isRateLimitError(403)).toBe(true);
  });

  it("returns false if status is not 403", () => {
    expect(isRateLimitError(200)).toBe(false);
    expect(isRateLimitError(404)).toBe(false);
    expect(isRateLimitError(500)).toBe(false);
  });
});

describe("buildGithubSearchUrl", () => {
  it("builds the correct URL with baseUrl", () => {
    const url = buildGithubSearchBaseUrl("https://api.github.com");
    expect(url).toBe("https://api.github.com/search/users");
  });

  it("builds the correct URL with default perPage", () => {
    const url = buildGithubSearchUrl("https://api.github.com", "john");
    expect(url).toBe("https://api.github.com/search/users?q=john&per_page=100");
  });

  it("builds the correct URL with custom perPage", () => {
    const url = buildGithubSearchUrl("https://api.github.com", "john", 50);
    expect(url).toBe("https://api.github.com/search/users?q=john&per_page=50");
  });

  it("encodes special characters in query", () => {
    const url = buildGithubSearchUrl("https://api.github.com", "john doe");
    expect(url).toBe(
      "https://api.github.com/search/users?q=john doe&per_page=100"
    );
  });
});
