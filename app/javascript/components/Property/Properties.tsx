import * as React from "react";
import Container from "react-bootstrap/Container";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { matchSorter } from "match-sorter";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useQuery,
} from "react-query";
import { PropertyProps } from "./Property";
import { Property } from "./useProperty";
import axios, { AxiosError } from "axios";

const queryClient = new QueryClient();

export type PropertiesProps = {
  properties: PropertyProps[];
};

interface PropertiesFunctionProps {
  setPropertyId: (propertyId: number) => {};
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

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: HTMLInputElement) => row.value[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

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
                  {property.street_address} {property.owner_name}{" "}
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
