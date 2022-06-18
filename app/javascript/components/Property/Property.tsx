import * as React from "react";
import { useParams } from "react-router-dom";
import useProperty from "./useProperty";
import ListGroup from "react-bootstrap/ListGroup";

export default function Property({ propertyId }: { propertyId: number }) {
  const params = useParams();
  const property = useProperty(parseInt(params.propertyId, 10));

  const {
    street_address,
    owner_name,
    owner_mailing_address,
    city_state_zip,
    property_full_address,
    units_at_property,
    g_code,
    latitude,
    longitude,
    created_at,
    updated_at,
    owner_full_mailing_address,
    landlords_id,
    addresses_id,
  } = property || {};

  return property ? (
    <ListGroup>
      <ListGroup.Item>id: {propertyId}</ListGroup.Item>
      <ListGroup.Item>street_address: {street_address}</ListGroup.Item>
      <ListGroup.Item>owner_name: {owner_name}</ListGroup.Item>
      <ListGroup.Item>
        owner_mailing_address: {owner_mailing_address}
      </ListGroup.Item>
      <ListGroup.Item>city_state_zip: {city_state_zip}</ListGroup.Item>
      <ListGroup.Item>
        property_full_address: {property_full_address}
      </ListGroup.Item>
      <ListGroup.Item>units_at_property: {units_at_property}</ListGroup.Item>
      <ListGroup.Item>g_code: {g_code}</ListGroup.Item>
      <ListGroup.Item>latitude: {latitude}</ListGroup.Item>
      <ListGroup.Item>longitude: {longitude}</ListGroup.Item>
      <ListGroup.Item>created_at: {created_at}</ListGroup.Item>
      <ListGroup.Item>updated_at: {updated_at}</ListGroup.Item>
      <ListGroup.Item>
        owner_full_mailing_address: {owner_full_mailing_address}
      </ListGroup.Item>
      <ListGroup.Item>landlords_id: {landlords_id}</ListGroup.Item>
      <ListGroup.Item>addresses_id: {addresses_id}</ListGroup.Item>
    </ListGroup>
  ) : (
    <p>Loading…</p>
  );
}
