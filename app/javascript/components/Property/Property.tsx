import * as React from "react";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { Property } from "./useProperty";
interface PropertyFunctionProps {
  propertyId: number;
  setPropertyId: (propertyId: number) => void;
}

export function fetchProperty(
  pageParam: number | undefined
): Promise<Property> {
  return typeof pageParam === "undefined"
    ? Promise.reject(new Error("invalid pageParam"))
    : axios.get(`properties/${pageParam}`).then((response) => response.data);
}

function useProperty(id: number | undefined) {
  return useQuery(["property", id], () => {
    enabled: Boolean(id);
  });
}

export default function Property(props: PropertyFunctionProps) {
  // there will never be an object with a negative int
  const [propertyId, setPropertyId] = React.useState(-1);

  return (
    <Container>

    </Container>
  );
}
