import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/code-highlight/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./services/api";
import { ModalsProvider } from "@mantine/modals";
import { defaultTheme } from "./themes/default";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={defaultTheme}>
      <Notifications position="top-right" />
      <ModalsProvider
        labels={{
          confirm: "Yes",
          cancel: "Cancel",
        }}
      >
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
