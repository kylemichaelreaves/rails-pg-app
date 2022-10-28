import * as React from "react";
import {useLoaderData} from "react-router-dom";
import useProperty, {PropertyInterface} from "./useProperty";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

export async function loader({params}: { params: { id: number } }) {
    await useProperty(params.id);
}

export default function Property() {
    const property = useLoaderData() as PropertyInterface;

    return property ? (
        <Container>
            <ListGroup>
                <ListGroup.Item>id: {property.id}</ListGroup.Item>
                <ListGroup.Item>street_address: {property.street_address}</ListGroup.Item>
                <ListGroup.Item>owner_name: {property.owner_name}</ListGroup.Item>
                <ListGroup.Item>owner_mailing_address: {property.owner_mailing_address}</ListGroup.Item>
                <ListGroup.Item>city_state_zip: {property.city_state_zip}</ListGroup.Item>
                <ListGroup.Item>property_full_address: {property.property_full_address}</ListGroup.Item>
                <ListGroup.Item>units_at_property: {property.units_at_property}</ListGroup.Item>
                <ListGroup.Item>g_code: {property.display_name}</ListGroup.Item>
                <ListGroup.Item>latitude: {property.latitude}</ListGroup.Item>
                <ListGroup.Item>longitude: {property.longitude}</ListGroup.Item>
                <ListGroup.Item>created_at: {property.created_at}</ListGroup.Item>
                <ListGroup.Item>updated_at: {property.updated_at}</ListGroup.Item>
                <ListGroup.Item>owner_full_mailing_address: {property.owner_full_mailing_address}</ListGroup.Item>
            </ListGroup>
        </Container>
    ) : (
        <p>Loading…</p>
    );
}
