import * as React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { matchSorter } from "match-sorter";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { PropertyProps } from "./Property";
import { Property } from "./useProperty";
import useIntersectionObserver from "../hooks/useIntersectObserver";
import useProperties, { fetchProperties } from "./useProperties";

const queryClient = new QueryClient();

export type PropertiesProps = {
  properties: PropertyProps[];
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: HTMLInputElement) => row.value[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

export default function Properties() {
  // const { status, data, error, isFetching } = useProperties();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery("properties", fetchProperties, {
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
    getNextPageParam: (lastPage) => lastPage.nextId ?? false,
  });

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <Container>
      <h2>Properties</h2>
      <h4>Jersey City</h4>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="search properties"
          aria-label="search properties"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>
      <div>
        {status === "loading" ? (
          "Loading…"
        ) : status === "error" ? (
          <span>Error: {error}</span>
        ) : (
          <>
            <div>
              {data.pages.map((property: Property) => (
                <p key={property.id}>
                  {property.street_address} {property.owner_name}{" "}
                  {property.landlords_id}
                  {property.owner_full_mailing_address}
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating…" : " "}</div>
          </>
        )}
      </div>
      <Button>Button</Button>
    </Container>
  );
}
