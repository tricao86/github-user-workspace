import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  searchUsersUseCase,
  type GithubUser,
} from "@schedulo/github-user-core-lib";
import { BASE_URL, PER_PAGE } from "@shared/config/env";
import { githubRepository } from "../infrastructure/githubRepositoryImpl";

export interface SearchState {
  query: string;
  users: GithubUser[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  users: [],
  loading: false,
  error: null,
};

interface ThunkApiConfig {
  rejectValue: string;
  extra: {
    t: (key: string) => string;
  };
}

/**
 * Thunk to fetch GitHub users
 */
export const fetchUsers = createAsyncThunk<
  GithubUser[],
  string,
  ThunkApiConfig
>("search/fetchUsers", async (query: string, { rejectWithValue, extra }) => {
  try {
    const perPage = PER_PAGE;
    const baseUrl = BASE_URL;

    const users = await searchUsersUseCase(githubRepository, {
      url: baseUrl,
      query,
      perPage,
    });
    return users;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const messageKey = err.message;
      const translated = extra.t?.(messageKey) || "Unknown error";
      return rejectWithValue(translated);
    }
    return rejectWithValue("Unknown error");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    reset(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, reset } = searchSlice.actions;
export default searchSlice.reducer;
