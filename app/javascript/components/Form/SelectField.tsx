import * as React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default function SelectField() {
  return (
    <Container>
      <h2>SelectField</h2>
      <Form.Select aria-label="Addresses, Landlords, Properties">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </Container>
  );
}
