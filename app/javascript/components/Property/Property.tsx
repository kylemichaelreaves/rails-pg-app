import * as React from "react";
import {useLoaderData} from "react-router-dom";
import useProperty, {PropertyInterface} from "../../hooks/useProperty";
import {Container, List, ListItem, ListItemText, Card, CardContent, Typography} from "@mui/material";

export async function loader({params}: { params: { id: number } }) {
    await useProperty(params.id);
}

export default function Property() {
    const property = useLoaderData() as PropertyInterface;

    return property ? (
        <Container>
            {/*{property.property_full_address !== property.owner_full_mailing_address ? (*/}
            {/*    <Alert severity="error">*/}
            {/*        <AlertTitle>The landlord has a different mailing address from this property.</AlertTitle>*/}
            {/*    </Alert>*/}
            {/*) : ""}*/}
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Property Details
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="ID" secondary={property.id}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Street Address" secondary={property.street_address}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Owner Name" secondary={property.owner_name}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Owner Mailing Address" secondary={property.owner_mailing_address}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="City State Zip" secondary={property.city_state_zip}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Property Full Address" secondary={property.property_full_address}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Units at Property" secondary={property.units_at_property}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Display Name" secondary={property.display_name}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Latitude" secondary={property.latitude}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Longitude" secondary={property.longitude}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Created At" secondary={property.created_at}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Updated At" secondary={property.updated_at}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Owner Full Mailing Address"
                                          secondary={property.owner_full_mailing_address}/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Container>
    ) : (
        <Typography>Loading…</Typography>
    );
}

