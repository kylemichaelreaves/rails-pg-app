import * as React from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import SelectField from "./SelectField";
import { UsePropertiesCount } from "./Property/usePropertiesCount";
import Map from "./Map/Map";

export default function Home() {
  return (
    <Container>
      <NavBar />
      <Map />
    </Container>
  );
}
