import * as React from "react";
import { UsePropertiesCount } from "./Property/usePropertiesCount";
import UseAddressesCount from "./Address/useAddressesCount";
import { useLandlordsCount } from "./Landlord/useLandlordsCount";
import Container from "react-bootstrap/Container";

export default function CountsTable() {
  return <>{UsePropertiesCount}</>;
}
