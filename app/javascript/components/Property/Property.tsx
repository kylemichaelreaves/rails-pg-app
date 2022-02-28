import * as React from "react";
import Container from "react-bootstrap/Container";

import Properties from "./Properties";
import  {ReactQueryDevtools}  from "react-query/types/devtools";

interface PropertyProps {
  propertyId: number;
  setPropertyId: Function;
}

export default function Property(props: PropertyProps) {
  // there will never be an object with a negative int
  const [propertyId, setPropertyId] = React.useState(-1);

  return (
    <Container>
     {propertyId > -1 ? (
       <Property propertyId={propertyId} setPropertyId={setPropertyId} />
     ) : (
       <Properties setPropertyId={setPropertyId} />
     )}
       <ReactQueryDevtools initialIsOpen />
    </Container>
  );
}
