import * as React from "react";
import "@testing-library/jest-dom";
import {
  render,
  RenderOptions,
  screen,
  fireEvent,
} from "@testing-library/react";
// import renderer from "react-test-renderer";
import Properties from "../../../../app/javascript/components/Property/Properties";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

it("renders the component", () => {
  render(<Properties />);
  expect(screen.getByText("Properties Component")).toBeInTheDocument();
});

// https://react-query.tanstack.com/guides/testing#testing-load-more--infinite-scroll
// https://tkdodo.eu/blog/testing-react-query