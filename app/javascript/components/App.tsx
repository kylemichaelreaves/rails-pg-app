import * as React from "react";
import Home from "./Home";
import { Outlet } from "react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <Outlet />
    </QueryClientProvider>
  );
}
