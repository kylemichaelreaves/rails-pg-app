import * as React from "react";
import Container from "react-bootstrap/Container";
import Property from "./Property";
import { useTable, usePagination } from "react-table";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";

import useProperties from "./useProperties";

interface PropertyProp {
  id: number;
  streetAddress: string;
  ownerName: string;
  ownerMailingAddress: string;
  cityStateZip: string;
  propertyFullAddress: string;
  unitsAtProperty: number;
  gCode: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  ownerFullMailingAddress: string;
  landlordsId: number;
}

const queryClient = new QueryClient();
// function propertiesLoader() {
//   const { isLoading, error, data, isFetching } = useQuery("propertyData", () =>
//     fetch("http://127.0.0.1:3000/api/v1/properties").then((res) => res.json())
//   );

//   if (isFetching) return "…Fetching…";

//   if (isLoading) return "…Loading…";

//   if (error) return "An error has occured: " + error;

//   return (
//     <div>
//       <div>{isFetching ? "…Updating…" : ""}</div>
//       <h1>{data.streetAddress}</h1>
//       <p>{data.ownerName}</p>
//       <p>{data.landlordsId}</p>
//       <p>{data.ownerMailingAddress}</p>
//       <p>{data.cityStateZip}</p>
//       <ReactQueryDevtools />
//     </div>
//   );
// }

const propertyTableCols = [
  "id",
  "streetAddress",
  "ownerName",
  "ownerMailingAddress",
  "cityStateZip",
  "propertyFullAddress",
  "unitsAtProperty",
  "gCode",
  "latitude",
  "longitude",
  "createdAt",
  "updatedAt",
  "ownerFullMailingAddress",
  "landlordsId",
];

export type Properties = {
  properties: PropertyProp[];
};

interface PropertiesProps {
  setPropertyId: Function;
}

// Properties contains Links to Property
export default function Properties({ setPropertyId }: PropertiesProps) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useProperties();

  // these columns will eventually go into a react-table component
  const columns = React.useMemo(
    () => [
      {
        Header: "Street Address",
        accessor: "streetAddress",
      },
      {
        Header: "Owner Name",
        accessor: "ownerName",
      },
      {
        Header: "Owner Mailing Address",
        accessor: "ownerMailingAddress",
      },
      {
        Header: "Owner Full Mailing Address",
        accessor: "ownerFullMailingAddress",
      },
      {
        Header: "City State Zip",
        accessor: "cityStateZip",
      },
      {
        Header: "Property Full Address",
        accessor: "propertyFullAddress",
      },
      {
        Header: "Units at Property",
        accessor: "unitsAtProperty",
      },
      {
        Header: "G-Code",
        accessor: "gCode",
      },
      {
        Header: "Latitude",
        accessor: "latitude",
      },
      {
        Header: "Longitude",
        accessor: "longitude",
      },
    ],
    []
  );

  const tableData = React.useMemo(() => useProperties(), [])

  //
  // the data object for the react-table needs to be "memoized"
  // which means it needs to be called inside in a useMemo hook

  return (
    <Container>
      <h2>Properties</h2>
      <div>
        {status === "loading" ? (
          "Loading…"
        ) : status === "error" ? (
          <span>Error: {error}</span>
        ) : (
          <>
            <div>
              {data.map((property: PropertyProp) => (
                <p key={property.id}>
                  {/* the link to the individual property will go here */}
                  {property.ownerName}
                  {property.landlordsId}
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating…" : " "}</div>
          </>
        )}
      </div>

      {/* {properties.map((property: Property) => {
        return (
          <div key={property.id}>
            <h2>{property.streetAddress}</h2>
            <h3>{property.ownerName}</h3>
            <h3>{property.landlordsId}</h3>
            <h4>{property.ownerMailingAddress}</h4>
            <h4>{property.cityStateZip}</h4>
          </div>
        );
      })} */}
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </Container>
  );
}
