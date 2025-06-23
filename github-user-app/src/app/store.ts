import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@features/user/state/searchSlice";
import i18n from "@locales/i18n";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          t: i18n.t, // inject `t()` into thunk
        },
      },
    }),
});

// Type for useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
