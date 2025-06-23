import {
  GithubUser,
  SearchUserRequest,
  searchUsersUseCase,
} from "@schedulo/github-user-core-lib";
import { BASE_URL, PER_PAGE } from "@shared/config/env";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useEffect, useState } from "react";
import { githubRepository } from "../infrastructure/githubRepositoryImpl";

/**
 * Custom hook for searching GitHub users with debounce and error handling.
 * @param query Raw user input string
 * @returns { users, loading, error }
 */
export function useGithubSearch(query: string) {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      if (debouncedQuery.length < 3) {
        setUsers([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const perPage = PER_PAGE;
        const baseUrl = BASE_URL;

        const request: SearchUserRequest = {
          url: baseUrl,
          query: debouncedQuery,
          perPage,
        };

        const result = await searchUsersUseCase(githubRepository, request);

        setUsers(result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error occurred.";
        setError(message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort(); // Cancel previous request if any (for future extensibility)
    };
  }, [debouncedQuery]);

  return { users, loading, error };
}
