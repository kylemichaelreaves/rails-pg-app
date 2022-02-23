import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        {/* <Link
          to="api/v1/properties"
          className="btn btn-lg custom-button"
          role="button"
        >
          Properties
        </Link> */}
        <Nav.Link eventKey="api/v1/properties">Properties</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="api/v1/landlords">Landlords</Nav.Link>
        {/* <Link
          to="/landlords"
          className="btn btn-lg custom-button"
          role="button"
        >
          Landlords
        </Link> */}
      </Nav.Item>
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
