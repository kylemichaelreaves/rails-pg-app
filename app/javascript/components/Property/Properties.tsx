import * as React from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useInfiniteQuery } from "react-query";
import { PropertyProps } from "./Property";
import { Property } from "./useProperty";
import useIntersectionObserver from "../hooks/useIntersectObserver";
import useProperties, { fetchProperties } from "./useProperties";
import { useInView } from "react-intersection-observer";
import { ReactQueryDevtools } from "react-query/devtools";

export type PropertiesProps = {
  properties: PropertyProps[];
};

export default function Properties() {
  // const { status, data, error, isFetching } = useProperties();

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

  React.useEffect(() => {
    if (inView) {
      console.log("ref is in view");
      fetchNextPage();
    }
  }, [inView]);

  React.useEffect(() => {
    const onBottom = function () {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (bottom) {
        console.log(
          "you've reached bottom"
        );
      }
    };
    window.addEventListener("scroll", onBottom);
  }, []);

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
                {data.pages[0].map((property: Property, i: number) => (
                  <React.Fragment key={i}>
                    <p key={property.id}>
                      {property.street_address} {property.owner_name}{" "}
                      {property.landlords_id}{" "}
                      {property.owner_full_mailing_address}{" "}
                    </p>
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
