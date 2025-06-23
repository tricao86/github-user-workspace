import reducer, { setQuery, reset, fetchUsers, SearchState } from "@features/user/state/searchSlice";

jest.mock('@shared/config/env', () => ({
  PER_PAGE: 100,
  BASE_URL: 'https://mock.api.com',
}));


describe("searchSlice reducer", () => {
  const initialState = {
    query: "",
    users: [],
    loading: false,
    error: null,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it("should handle setQuery", () => {
    const action = setQuery("tri");
    const state = reducer(initialState, action);
    expect(state.query).toBe("tri");
  });

  it("should handle reset", () => {
    const state: SearchState = {
      query: "",
      users: [{ id: 1, login: "tri", avatar_url: "", type: "User", score: 1 }],
      loading: true,
      error: "Something",
    };
    const newState = reducer(state, reset());
    expect(newState).toEqual(initialState);
  });

  it("should handle fetchUsers.pending", () => {
    const action = { type: fetchUsers.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle fetchUsers.fulfilled", () => {
    const users = [{ login: "tri", avatar_url: "", type: "User", score: 9.9 }];
    const action = { type: fetchUsers.fulfilled.type, payload: users };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.users).toEqual(users);
    expect(state.error).toBeNull();
  });

  it("should handle fetchUsers.rejected", () => {
    const action = {
      type: fetchUsers.rejected.type,
      payload: "API error",
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("API error");
  });
});
