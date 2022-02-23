import * as React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from "./NavBar";

var Styles = styled.div`
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

export default function Home() {
  return (
    <Container>
      <h1 className="display-4">Find My Landlord: North Jersey</h1>
      {/* <Link to="api/v1/properties" className="btn btn-lg custom-button" role="button">
        Properties
      </Link>
      {" "}
      <Link to="/landlords" className="btn btn-lg custom-button" role="button">
        Landlords
      </Link> */}
      <NavBar />
    </Container>
  );
}

// const API_URL = "http://localhost:3000/properties/";
