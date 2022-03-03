import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <Container>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <LinkContainer to="api/v1/properties">
            <Nav.Link>Properties</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="api/v1/landlords">
            Landlords
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="link-2">
            Map
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            About
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
