import { GithubUser } from "../../domain/GithubUser";

/**
 * Normalize the score value to 2 decimal places.
 */
export const normalizeScore = (user: GithubUser): GithubUser => ({
  ...user,
  score: parseFloat(user.score.toFixed(2)),
});
