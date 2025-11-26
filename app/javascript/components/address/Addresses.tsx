import * as React from "react";
import {Container} from "@mui/material";
import {AddressForm} from "./AddressForm";
import Typography from "@mui/material/Typography";

export default function Addresses() {
    return (
        <Container>
            <Typography>Create an address with this form. <br/> Is the address associated with a Landlord? If there is,
                there should be a visual indication.<br/> Is there more than one unit at this address? If there is,
                there should ba a visual
                indication.</Typography>
            <AddressForm/>
        </Container>
    );
}
