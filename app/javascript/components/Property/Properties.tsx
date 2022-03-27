import * as React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { PropertyProps } from "./Property";
import fetchProperty, { Property } from "./useProperty";
import axios, { AxiosError } from "axios";
import useProperties, { fetchProperties } from "./useProperties";
import { useInView } from "react-intersection-observer";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Properties() {
  const [pageParam, setPageParam] = React.useState(0);
  const { ref, inView } = useInView();

  const getInfiniteProperties = async ({ pageParam = 0 }) => {
    return await axios
      .get(`http://127.0.0.1:3000/api/v1/properties`, {
        params: { page: pageParam },
      })
      .then((response) => response.data);
  };

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
  } = useInfiniteQuery("properties", getInfiniteProperties, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data;
    },
  });

  React.useEffect(() => {
    if (data?.pages) {
      console.log(
        `data.pages: ${data?.pages?.map((page) =>
          page?.map((property: Property) => property?.street_address)
        )}`
      );
    }
  }, [data]);

  React.useEffect(() => {
    if (inView) {
      console.log("button is in view");
      setPageParam(pageParam + 1);
      console.log(`pageParam: ${pageParam}`);
      fetchNextPage({ pageParam });
    }
  }, [inView]);

  return (
    <Container>
      <h2>Properties Component</h2>
      <div>
        {status === "loading" ? (
          "Loading…"
        ) : status === "error" ? (
          <span>Error: {error}</span>
        ) : (
          <>
            <Button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </Button>
            <div>
              {data?.pages?.map((page, i) => (
                <React.Fragment key={i}>
                  {page?.map((property: Property) => (
                    <li key={property.id}>{property.street_address}</li>
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
      </Button>
      <ReactQueryDevtools initialIsOpen />
    </Container>
  );
}
