export function isRateLimitError(status: number): boolean {
  return status === 403;
}

export function buildGithubSearchUrl(baseUrl: string, query: string, perPage = 100): string {
  return `${baseUrl}/search/users?q=${query}&per_page=${perPage}`;
}

export function buildGithubSearchBaseUrl(baseUrl: string): string {
  return `${baseUrl}/search/users`;
}