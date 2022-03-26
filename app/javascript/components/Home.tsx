import * as React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <Container>
      <h1 className="display-4">Find My Landlord: North Jersey</h1>
      <NavBar />
    </Container>
  );
}
