import * as React from "react";
import Container from "react-bootstrap/Container";
import Properties from "./Properties";
import axios from "axios";
import { useQuery } from "react-query";

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

async function fetchProperty(id: number | undefined) {
  return typeof id === "undefined"
    ? Promise.reject(new Error("invalid id"))
    : await axios.get(`properties/${id}`).then((response) => response.data);
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
