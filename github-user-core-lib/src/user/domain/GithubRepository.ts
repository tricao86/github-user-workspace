import { GithubUser } from "./GithubUser";

export interface GithubRepository {
  searchUsers(
    url: string,
    query: string,
    perPage?: number,
    signal?: AbortSignal
  ): Promise<GithubUser[]>;
}
