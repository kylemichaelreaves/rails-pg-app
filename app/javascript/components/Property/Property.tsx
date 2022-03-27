import * as React from "react";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
interface PropertyFunctionProps {
  propertyId: number;
  setPropertyId: (propertyId: number) => void;
}
export interface PropertyProps {
  id: number;
  street_address: string;
  owner_name: string;
  owner_mailing_address: string;
  city_state_zip: string;
  property_full_address: string;
  units_at_property: number;
  g_code: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  owner_full_mailing_address: string;
  landlords_id: number;
}

export function fetchProperty(
  pageParam: number | undefined
): Promise<PropertyProps> {
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
      {/* {propertyId > -1 ? (
       <Property propertyId={propertyId} setPropertyId={setPropertyId} />
     ) : (
       <Properties setPropertyId={setPropertyId} />
     )} */}
    </Container>
  );
}
