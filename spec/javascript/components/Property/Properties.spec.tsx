import * as React from "react";
import "@testing-library/jest-dom";

import { renderHook } from "@testing-library/react-hooks";
import {
  render,
  RenderOptions,
  screen,
  fireEvent,
} from "@testing-library/react";
import { create } from "react-test-renderer";
import Properties from "../../../../app/javascript/components/Property/Properties";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

it("renders asynchronously", async () => {
  const { result, waitFor } = renderHook(() => <Properties />, {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toBeDefined();
});

it("renders the component", () => {
  render(<Properties />);
  expect(screen.getByText("Properties Component")).toBeInTheDocument();
});

// https://react-query.tanstack.com/guides/testing#testing-load-more--infinite-scroll
// https://tkdodo.eu/blog/testing-react-query
