import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import "./index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routes.tsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
