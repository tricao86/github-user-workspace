import { GithubRepository } from "../../domain/GithubRepository";
import { GithubUser } from "../../domain/GithubUser";
import { SearchUserRequest } from "../dtos/SearchUserRequest";
import { normalizeScore } from "../services/UserScoringService";

/**
 * Search GitHub users via repository and normalize their scores.
 */
export const searchUsersUseCase = async (
  repo: GithubRepository,
  request: SearchUserRequest
): Promise<GithubUser[]> => {
  const { url, query, perPage = 100 } = request;

  if (query.length < 3) return [];

  const users = await repo.searchUsers(url, query, perPage);

  return users.map(normalizeScore); // apply business rule
};
