import { cryptoApi } from "../services/cryptoApi";
import { configureStore } from "@reduxjs/toolkit";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware
    ),
});

export default store;
