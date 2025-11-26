import * as React from "react";
import {useLoaderData} from "react-router-dom";
import {Box, Typography, Card, CardContent} from "@mui/material";
import useLandlord, {LandlordInterface} from "../../hooks/useLandlord";

export async function loader({params}: { params: { landlordId: number } }) {
    return {
        landlord: await useLandlord(params.landlordId),
    };
}

export default function Landlord() {

    const landlord = useLoaderData() as LandlordInterface;

    return landlord ? (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Landlord Details
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                    <Typography variant="body1">
                        <strong>ID:</strong> {landlord.id}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Name:</strong> {landlord.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Mailing Address:</strong> {landlord.mailing_address}
                    </Typography>
                    <Typography variant="body1">
                        <strong>City, State, Zip:</strong> {landlord.city_state_zip}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Full Mailing Address:</strong> {landlord.full_mailing_address}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    ) : (
        <Typography>Loading…</Typography>
    );
}

