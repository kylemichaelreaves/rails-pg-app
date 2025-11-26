import * as React from "react";
import {Container, TextField, Button, CircularProgress, Typography, Grid} from "@mui/material";
import {AddressInterface, blankAddress} from "~//components/address/Address";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {createAddress} from "~//components/address/useAddress";
import {AddressAutofill} from '@mapbox/search-js-react';

export const AddressForm = () => {

    const [address, setAddress] = React.useState<AddressInterface>(blankAddress)

    const {
        mutate,
        isPending: isLoading,
    } = useMutation<AddressInterface, AxiosError>({
        mutationFn: () => createAddress(address)
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setAddress({...address, [target.name]: target.value});
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate()
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{mb: 3}}>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography variant="body2" gutterBottom>Street Address</Typography>
                        {/* @ts-expect-error - React 19 compatibility issue with Mapbox AddressAutofill */}
                        <AddressAutofill accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}>
                            <TextField
                                fullWidth
                                id="streetAddress"
                                name="streetAddress"
                                placeholder="enter a street address"
                                value={address.street_address}
                                autoComplete="address-line1"
                                onChange={handleChange}
                            />
                        </AddressAutofill>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography variant="body2" gutterBottom>apartment or unit?</Typography>
                        <TextField
                            fullWidth
                            id="apartmentOrUnit"
                            name="apartmentOrUnit"
                            placeholder="enter an apt or unit #"
                            autoComplete="address-line2"
                            value={address.apt_or_unit_number}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mb: 3}}>
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography variant="body2" gutterBottom>City</Typography>
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            placeholder="enter a city"
                            value={address.municipality}
                            autoComplete="address-level2"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography variant="body2" gutterBottom>State</Typography>
                        <TextField
                            fullWidth
                            id="state"
                            name="state"
                            placeholder="enter a state"
                            value={address.state}
                            autoComplete="address-level1"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography variant="body2" gutterBottom>Zipcode</Typography>
                        <TextField
                            fullWidth
                            id="zipCode"
                            name="zipCode"
                            placeholder="enter a zipcode"
                            type="number"
                            value={address.zipcode}
                            autoComplete="postal-code"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{mb: 3}}>
                    <Grid>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading || address === blankAddress}
                            startIcon={isLoading && <CircularProgress size={20}/>}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
