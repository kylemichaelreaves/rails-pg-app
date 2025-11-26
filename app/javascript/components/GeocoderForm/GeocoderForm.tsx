import * as React from "react";
import {TextField, Button, FormControl, Grid} from "@mui/material";
import {AddressInterface, blankAddress} from ".././address/Address";

interface GeocoderFormProps {
    readonly onSave: (address: AddressInterface) => void;
}

export default function GeocoderForm({onSave}: GeocoderFormProps) {
    const [address, setAddress] = React.useState(blankAddress);

    const handleSave = () => {
        onSave(address);
        blankAddress.id++;
        setAddress(blankAddress);
    };

    return (
        <>
            {address.zipcode !== "" && address.zipcode.length === 5 ? (
                <div>{JSON.stringify(address.zipcode)}</div>
            ) : (
                <br/>
            )}
            <form>
                <FormControl fullWidth sx={{mb: 3}}>
                    <TextField
                        id="street_address"
                        label="Street Address"
                        type="text"
                        placeholder="street address"
                        value={address.street_address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAddress({...address, street_address: e.target.value})
                        }
                    />
                </FormControl>
                <Grid container spacing={2} sx={{mb: 3}}>
                    <Grid size={{xs: 12, md: 4}}>
                        <TextField
                            fullWidth
                            id="municipality"
                            label="Municipality"
                            type="text"
                            placeholder="city"
                            value={address.municipality}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress({...address, municipality: e.target.value});
                            }}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <TextField
                            fullWidth
                            id="state"
                            label="State"
                            type="text"
                            placeholder="state"
                            value={address.state}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress({...address, state: e.target.value});
                            }}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <TextField
                            fullWidth
                            id="zipcode"
                            label="Zipcode"
                            type="text"
                            placeholder="zip"
                            value={address.zipcode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAddress({...address, zipcode: e.target.value});
                            }}
                        />
                    </Grid>
                </Grid>
            </form>
            <Button
                size="large"
                variant="contained"
                onClick={handleSave}
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

