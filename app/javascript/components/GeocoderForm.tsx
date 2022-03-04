import * as React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number | string;
}

let blankAddress: Address = {
  streetAddress: "",
  city: "",
  state: "",
  zipCode: 0,
};

interface GeocoderFormProps {
  onSave: (address: Address) => void;
}

export default function GeocoderForm({ onSave }: GeocoderFormProps) {
  const [address, setAddress] = React.useState(blankAddress);

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="geocoderFrom.ControlInput1">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="streetAddress"
            value={address.streetAddress}
            onChange={(e) =>
              setAddress({ ...address, streetAddress: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="geocoderFrom.ControlInput2">
          <Form.Label>City or municipality</Form.Label>
          <Form.Control
            type="text"
            placeholder="city"
            value={address.city}
            onChange={(e) => {
              setAddress({ ...address, city: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="geocoderFrom.ControlInput3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="state"
            value={address.state}
            onChange={(e) => {
              setAddress({ ...address, state: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="geocoderFrom.ControlInput4">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="zip"
            value={address.zipCode}
            onChange={(e) => {
              setAddress({ ...address, zipCode: e.target.value });
            }}
          />
        </Form.Group>
      </Form>
      <Button
        size="lg"
        onClick={() => [onSave(address), setAddress(blankAddress)]}
      >
        Geocode Address
      </Button>{" "}
    </>
  );
}
