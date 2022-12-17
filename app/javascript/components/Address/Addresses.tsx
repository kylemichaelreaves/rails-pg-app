import * as React from "react";
import Container from "react-bootstrap/Container";
import {AddressForm} from "./AddressForm";
import Form from "react-bootstrap/Form";

export default function Addresses() {
    return (
        <Container>
            <Form.Text>Create an address with this form. <br/> Is the address associated with a Landlord? If there is,
                there should be a visual indication.<br/> Is there more than one unit at this address? If there is,
                there should ba a visual
                indication.</Form.Text>
            <AddressForm/>
        </Container>
    );
}
