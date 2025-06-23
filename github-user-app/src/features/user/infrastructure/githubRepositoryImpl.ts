import type { GithubRepository } from "@schedulo/github-user-core-lib";
import { buildGithubSearchUrl } from "@shared/utils/network";

export const githubRepository: GithubRepository = {
  async searchUsers(url, query, perPage, signal?: AbortSignal) {
    const searchUrl = buildGithubSearchUrl(url, query, perPage);

    const res = await fetch(searchUrl, { signal });

    if (res.status === 403) {
      throw new Error("rate_limit");
    }

    if (!res.ok) {
      throw new Error("errors.network_error");
    }

    const data = await res.json();
    return data.items;
  },
};
