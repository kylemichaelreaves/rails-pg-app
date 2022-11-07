import * as React from "react";
import Container from "react-bootstrap/Container";

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
}

export const blankAddress: AddressInterface = {
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
