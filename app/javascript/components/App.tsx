import * as React from "react";
import Home from "./Home";
import { Outlet } from "react-router";
import PropertyTable from "./Property/PropertyTable";
import useProperties from "./Property/useProperties";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

// these columns will eventually go into a react-table component
// const columns = React.useMemo(
//   () => [
//     {
//       Header: "Street Address",
//       accessor: "streetAddress",
//     },
//     {
//       Header: "Owner Name",
//       accessor: "ownerName",
//     },
//     {
//       Header: "Owner Mailing Address",
//       accessor: "ownerMailingAddress",
//     },
//     {
//       Header: "Owner Full Mailing Address",
//       accessor: "ownerFullMailingAddress",
//     },
//     {
//       Header: "City State Zip",
//       accessor: "cityStateZip",
//     },
//     {
//       Header: "Property Full Address",
//       accessor: "propertyFullAddress",
//     },
//     {
//       Header: "Units at Property",
//       accessor: "unitsAtProperty",
//     },
//     {
//       Header: "G-Code",
//       accessor: "gCode",
//     },
//     {
//       Header: "Latitude",
//       accessor: "latitude",
//     },
//     {
//       Header: "Longitude",
//       accessor: "longitude",
//     },
//   ],
//   []
// );

// const tableData = React.useMemo(() => useProperties(), []);

export default function App() {
  // const columns = React.useMemo(() => propertyTableCols, [])
  // const data = React.useMemo(() => useProperties(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      {/* <PropertyTable columns={columns} data={data} /> */}
      <Outlet />
    </QueryClientProvider>
  );
}
