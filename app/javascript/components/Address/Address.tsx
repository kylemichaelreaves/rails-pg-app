import * as React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export interface AddressProps {
  id: number;
  streetAddress: string;
  municipality: string;
  state: string;
  zipCode: string;
  longitude?: number;
  latitude?: number;
  latitude_and_longitude?: string;
  full_address?: string;
}

export let blankAddress: AddressProps = {
  id: 0,
  streetAddress: "",
  municipality: "",
  state: "",
  zipCode: "",
};

export interface AddressesProps {
  addresses: AddressProps[];
}

export default function Address() {
  return (
    <Container>
      <div>Address, a div within a Container</div>
    </Container>
  );
}
