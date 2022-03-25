import * as React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useInfiniteQuery } from "react-query";
import { PropertyProps } from "./Property";
import { Property } from "./useProperty";
import useIntersectionObserver from "../hooks/useIntersectObserver";
import axios, { AxiosError } from "axios";
import useProperties, { fetchProperties } from "./useProperties";
import { useInView } from "react-intersection-observer";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient } from "react-query";

export type PropertiesProps = {
  properties: PropertyProps[];
};

const queryClient = new QueryClient();

export default function Properties() {
  // const { status, data, error, isFetching } = useProperties();
  type PropertyResponse = { next?: number; properties: Property[] };

  const [page, setPage] = React.useState(0);

  const { ref, inView } = useInView();

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
  } = useInfiniteQuery(
    "properties",
    async ({ pageParam = 0 }) => {
      return await axios
        .get("api/v1/properties?cursor=" + pageParam)
        .then((res) => res.data);
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  React.useEffect(() => {
    if (inView) {
      console.log('ref in view; fetching next page');
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
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
            Input Search Button
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
                {data.pages.map((page) => (
                  <React.Fragment key={page.nextId}>
                    {page.data.map((property: Property) => (
                      <p key={property.id}>{property.street_address} </p>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              <div>{isFetching ? "Background Updating…" : " "}</div>
            </>
          )}
        </div>
        <Button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
          Button
        </Button>
      </Container>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
