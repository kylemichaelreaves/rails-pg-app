import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Properties from "../../../../app/javascript/components/Property/Properties";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

it("renders the component heading", () => {
  render(<Properties />, { wrapper: createWrapper() });
  expect(screen.getByText("Properties Component")).toBeInTheDocument();
});

// https://tanstack.com/query/latest/docs/framework/react/guides/testing
// https://tkdodo.eu/blog/testing-react-query
