import * as React from "react";
import "@testing-library/jest-dom/vitest";
import {describe, it, expect} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import {
    render,
    screen,
} from "@testing-library/react";
import Properties from "../../../../app/javascript/components/Property/Properties";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return ({children}: any) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

it("renders asynchronously", async () => {
    const {result} = renderHook(() => <Properties/>, {
        wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current).toBeDefined());
});

it("renders the component", () => {
    const Wrapper = createWrapper();
    render(
        <Wrapper>
            <Properties/>
        </Wrapper>
    );
    expect(screen.getByText("Properties Component")).toBeInTheDocument();
});

// https://react-query.tanstack.com/guides/testing#testing-load-more--infinite-scroll
// https://tkdodo.eu/blog/testing-react-query

