import * as React from "react";

import Container from "react-bootstrap/Container";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-quill/dist/quill.snow.css";

import "react-quill/dist/quill.snow.css";

const Styles = styled.div`
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

const API_URL = "http://localhost:3000/properties/";

export default function Home() {
  return (
    <Container>
      <h1 className="display-4">Find My Landlord: North Jersey</h1>
    </Container>
  );
}

