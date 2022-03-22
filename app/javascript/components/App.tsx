import * as React from "react";
import Home from "./Home";
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <Outlet />
    </QueryClientProvider>
  );
}
