import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {
  Formik,
  FormikHelpers,
  Field,
  useField,
  useFormik,
  useFormikContext,
} from "formik";

export default function AddressForm() {
  return (
    <Container>
      {/* <Formik initialValues={}> */}
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Street Address</Form.Label>
          <Form.Control as="input" placeholder="enter a street address" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>apartment or unit?</Form.Label>
          <Form.Control as="input" placeholder="enter an apt or unit #" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control as="input" placeholder="enter a city" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>State</Form.Label>
          <Form.Control as="input" placeholder="enter a state" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Zipcode</Form.Label>
          <Form.Control as="input" placeholder="enter a zipcode" />
        </Form.Group>
      </Row>
      ;
    </Container>
  );
}
