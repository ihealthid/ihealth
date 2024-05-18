import { notifications } from "@mantine/notifications";
import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorToaster: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    notifications.show({
      color: "red",
      title: "Error",
      message: "We got a rejected action!",
    });
  }

  return next(action);
};
