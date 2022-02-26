import * as React from "react";
import Container from "react-bootstrap/Container";
import { PropertyInterface } from "./Property";

export interface PropertiesInterface {
  properties: PropertyInterface[]
}

export default function Properties() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Street Address",
        accessor: "street_address",
      },
      {
        Header: "Owner Name",
        accessor: "owner_name",
      },
      {
        Header: "Owner Mailing Address",
        accessor: "owner_mailing_address",
      },
      {
        Header: "Owner Full Mailing Address",
        accessor: "owner_full_mailing_address",
      },
      {
        Header: "City State Zip",
        accessor: "city_state_zip",
      },
      {
        Header: "Property Full Address",
        accessor: "property_full_address",
      },
      {
        Header: "Units at Property",
        accessor: "units_at_property",
      },
      {
        Header: "G-Code",
        accessor: "g_code",
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

  return (
    <Container>
      <h3>Properties</h3>
      <br />
      <h5>
        A React component, inside another React component, supported by a Rails
        API
      </h5>
      <br />
      <p>
        A list of all the properties in our database will be generated here in
        this absolutely stunning component.
      </p>
    </Container>
  );
}
