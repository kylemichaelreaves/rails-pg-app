import * as React from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import SelectField from "./SelectField";
import { UsePropertiesCount } from "./Property/usePropertiesCount";
import { ReactQueryDevtools } from "react-query/devtools";

// TODO: Home compononet should display counts of properties, landlords, and addresses
export default function Home() {
  return (
    <Container>
      <NavBar />
      <SelectField />
      <UsePropertiesCount />
      <ReactQueryDevtools initialIsOpen />
    </Container>
  );
}
