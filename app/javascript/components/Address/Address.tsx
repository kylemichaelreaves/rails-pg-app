import * as React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export interface AddressInterface {
  id: number;
  street_address: string;
  municipality: string;
  state: string;
  zipcode: string;
  longitude?: number;
  latitude?: number;
  latitude_and_longitude?: string;
  full_address?: string;
  properties_id?: number;
}

const blankAddress: AddressInterface = {
  id: 0,
  street_address: "",
  municipality: "",
  state: "",
  zipcode: "",
};

export interface AddressesInterface {
  addresses: AddressInterface[];
}

export default function AddressFunction() {
  return (
    <Container>
      <div>Address, a div within a Container</div>
    </Container>
  );
}
