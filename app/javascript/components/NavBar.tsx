import * as React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <LinkContainer to="api/v1/properties">
        <Nav.Link>Properties</Nav.Link>
      </LinkContainer>
      <LinkContainer to="api/v1/landlords">
        <Nav.Link>Landlords</Nav.Link>
      </LinkContainer>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Map</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          About
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
