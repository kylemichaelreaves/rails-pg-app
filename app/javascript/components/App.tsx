import * as React from "react";
import PropertyTable from "./PropertyTable";
import styled from "styled-components";

export default function App() {
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
  
  const data = React.useMemo(() => {}, []);

  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }
      }
    }
  `;

  return (
    <Styles>
      <PropertyTable columns={columns} data={data} />
    </Styles>
  );
}
