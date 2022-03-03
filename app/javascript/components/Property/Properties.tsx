import * as React from "react";
import Container from "react-bootstrap/Container";

import { useTable, usePagination } from "react-table";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useQuery,
} from "react-query";
import { PropertyProps } from "./Property";
import { ReactQueryDevtools } from "react-query/devtools";
import { Property } from "./useProperty";
import axios from "axios";

const queryClient = new QueryClient();

export type PropertiesProps = {
  properties: PropertyProps[];
};

interface PropertiesFunctionProps {
  setPropertyId: Function;
}

async function fetchProperties(): Promise<Property[]> {
  return await axios
    .get("http://127.0.0.1:3000/api/v1/properties")
    .then((response) => response.data);
}

function useProperties() {
  return useQuery<Property[], Error>("properties", fetchProperties);
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

// Properties contains Links to Property
export default function Properties({ setPropertyId }: PropertiesFunctionProps) {
  const { status, data, error, isFetching } = useProperties();

  return (
    <Container>
      <h2>Properties</h2>
      <h3>Jersey City</h3>
      <div>
        {status === "loading" ? (
          "Loading…"
        ) : status === "error" ? (
          <span>Error: {error}</span>
        ) : (
          <>
            <div>
              {data.map((property: PropertyProps) => (
                <p key={property.id}>
                  {property.street_address}{" "}
                  {property.owner_name}{" "}
                  {property.landlords_id}
                  {property.owner_full_mailing_address}
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating…" : " "}</div>
          </>
        )}
      </div>
    </Container>
  );
}
