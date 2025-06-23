import type { GithubRepository } from "../domain/GithubRepository";
import type { GithubUser } from "../domain/GithubUser";

export const githubRepository: GithubRepository = {
  async searchUsers(
    url: string,
    query: string,
    perPage: number,
    signal?: AbortSignal
  ): Promise<GithubUser[]> {
    const searchUrl = `${url}?q=${query}&per_page=${perPage}`;

    const response = await fetch(searchUrl, { signal });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `GitHub API error: ${response.status}`);
    }

    const json = await response.json();
    return json.items;
  },
};
