import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AddressInterface, blankAddress} from "../Address/Address";

interface GeocoderFormProps {
    onSave: (address: AddressInterface) => void;
}

export default function GeocoderForm({onSave}: GeocoderFormProps) {
    const [address, setAddress] = React.useState(blankAddress);

    return (
        <>
            {address.zipcode !== "" && address.zipcode.length === 5 ? (
                <div>{JSON.stringify(address.zipcode)}</div>
            ) : (
                <br/>
            )}
            <Form>
                <Form.Group className="mb-3" controlId="street_address">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="street address"
                        value={address.street_address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAddress({...address, street_address: e.target.value})
                        }
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="municipality">
                        <Form.Label>Municipality</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="city"
                            value={address.municipality}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress({...address, municipality: e.target.value});
                            }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="state"
                            value={address.state}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress({...address, state: e.target.value});
                            }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="zipcode">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="zip"
                            value={address.zipcode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress({...address, zipcode: e.target.value});
                            }}
                        />
                    </Form.Group>
                </Row>
            </Form>
            <Button
                size="lg"
                onClick={() => [
                    onSave(address),
                    blankAddress.id++,
                    setAddress(blankAddress),
                ]}
            >
                {address.zipcode !== "" && address.zipcode.length === 5 ? (
                    <>Geocode Zipcode</>
                ) : (
                    <>Geocode Address</>
                )}
            </Button>{" "}
        </>
    );
}
