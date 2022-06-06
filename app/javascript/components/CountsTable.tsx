import * as React from "react";
import UsePropertiesCount from "./Landlord/useLandlordsCount";
import UseAddressesCount from "./Address/useAddressesCount";
import UseLandlordsCount from "./Landlord/useLandlordsCount";
import Container from "react-bootstrap/Container";

export default function CountsTable() {
  return (
    <>
      {UsePropertiesCount}
    </>
  );
}
