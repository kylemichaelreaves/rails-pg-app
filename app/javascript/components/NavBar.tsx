import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
    return (
        <Container fluid>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Navbar.Brand href="http://127.0.0.1:3000">
                    Find My Landlord
                </Navbar.Brand>
                <Nav.Item>
                    <Nav.Link as={Link} to="api/v1/properties">
                        Properties
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="api/v1/landlords">
                        Landlords
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="api/v1/addresses">
                        Addresses
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="api/v1/map">
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
