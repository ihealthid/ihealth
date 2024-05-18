import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./main";
import { rtkQueryErrorToaster } from "../middleware/rtk-query-error-toaster";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(rtkQueryErrorToaster),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
