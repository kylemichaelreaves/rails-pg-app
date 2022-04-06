import * as React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useInfiniteQuery, useQuery } from "react-query";
import { Property } from "./useProperty";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { ReactQueryDevtools } from "react-query/devtools";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Properties() {
  const [pageParam, setPageParam] = React.useState<number>(0);
  const { ref, inView } = useInView();

  const getInfiniteProperties = async ({ pageParam = 0 }) => {
    return await axios
      .get(`http://127.0.0.1:3000/api/v1/properties`, {
        params: { page: pageParam },
      })
      .then((response) => response.data);
  };

  const usePropertiesCount = () => {
    return useQuery("properties", async () => {
      await axios
        .get("http://127.0.0.1:3000/api/v1/properties")
        .then((response) => response.data),
        {
          select: (properties: Property[]) => properties.length,
        };
    });
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
      console.log(`${data?.pages?.length} pages`);
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
            <Container>
              <div>
                {data?.pages?.map((page, i) => (
                  <React.Fragment key={i}>
                    <ListGroup variant="flush">
                      {page?.map((property: Property) => (
                        <ListGroup.Item key={property.id}>
                          {property.street_address}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </React.Fragment>
                ))}
              </div>
            </Container>
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
