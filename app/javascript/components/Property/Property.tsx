import * as React from "react";
import {useLoaderData} from "react-router-dom";
import useProperty, {PropertyInterface} from "./useProperty";
import ListGroup from "react-bootstrap/ListGroup";

export async function loader({params}: { params: { propertyId: number } }) {
    await useProperty(params.propertyId);
}

export default function Property() {
    const property = useLoaderData() as PropertyInterface;

    return property ? (
        <ListGroup>
            <ListGroup.Item>
                id: {property.propertyId}
            </ListGroup.Item>
            <ListGroup.Item>street_address: {property.street_address}</ListGroup.Item>
            <ListGroup.Item>owner_name: {property.owner_name}</ListGroup.Item>
            <ListGroup.Item>
                owner_mailing_address: {property.owner_mailing_address}
            </ListGroup.Item>
            <ListGroup.Item>city_state_zip: {property.city_state_zip}</ListGroup.Item>
            <ListGroup.Item>
                property_full_address: {property.property_full_address}
            </ListGroup.Item>
            <ListGroup.Item>units_at_property: {property.units_at_property}</ListGroup.Item>
            <ListGroup.Item>g_code: {property.g_code}</ListGroup.Item>
            <ListGroup.Item>latitude: {property.latitude}</ListGroup.Item>
            <ListGroup.Item>longitude: {property.longitude}</ListGroup.Item>
            <ListGroup.Item>created_at: {property.created_at}</ListGroup.Item>
            <ListGroup.Item>updated_at: {property.updated_at}</ListGroup.Item>
            <ListGroup.Item>
                owner_full_mailing_address: {property.owner_full_mailing_address}
            </ListGroup.Item>
            <ListGroup.Item>landlord_id: {property.landlord_id}</ListGroup.Item>
            <ListGroup.Item>address_id: {property.address_id}</ListGroup.Item>
        </ListGroup>
    ) : (
        <p>Loading…</p>
    );
}
