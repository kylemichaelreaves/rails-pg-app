import * as React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PropertyInterface } from "./useProperty";
import { useInView } from "react-intersection-observer";
// import { matchSorter } from "match-sorter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  } = useInfiniteQuery(["properties"], getInfiniteProperties, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.id;
    },
  });

  //   function filterList(searchTerm: string): PropertyInterface[] {
  //     return matchSorter(data.pages, searchTerm);
  //   }

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
          <span>${`Error: {error}`}</span>
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
                      {page?.map((property: PropertyInterface) => (
                        <ListGroup key={property.id}>
                          <ListGroup.Item>
                            id:
                            <Link
                              style={{ display: "inline" }}
                              to={`${property.id}`}
                              key={property.id}
                            >
                              {property.id}
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {property.street_address}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {/* Link to Landlord component */}
                            landlords_id:
                            <Link
                              style={{ display: "inline" }}
                              to={`${property.landlord_id}`}
                              key={property.landlord_id}
                            >
                              {property.landlord_id}
                            </Link>
                          </ListGroup.Item>
                          <ListGroup.Item>{property.owner_name}</ListGroup.Item>
                          <ListGroup.Item>
                            {property.city_state_zip}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {/* Link to Address component */}
                            addresses_id:
                            <Link
                              style={{ display: "inline" }}
                              to={`addresses/${property.address_id}`}
                              key={property.address_id}
                            >
                              {property.address_id}
                            </Link>
                          </ListGroup.Item>
                        </ListGroup>
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
