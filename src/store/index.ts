import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { todoApi } from "./todos";

const reducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
