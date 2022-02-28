import * as React from "react";
import Home from "./Home";
import { Outlet } from "react-router";
import PropertyTable from "./Property/PropertyTable";
import useProperties from './Property/useProperties'

export default function App() {

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

  const columns = React.useMemo(() => propertyTableCols, [])
  const data = React.useMemo(() => useProperties(), [])

  return (
    <>
      <Home />
      <PropertyTable columns={columns} data={data} />
      <Outlet />
    </>
  );
}
