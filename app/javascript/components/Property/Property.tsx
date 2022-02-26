import * as React from "react";
import Container from "react-bootstrap/Container";

export interface PropertyInterface {
  id: number;
  streetAddress: string;
  ownerName: string;
  ownerMailingAddress: string;
  cityStateZip: string;
  propertyFullAddress: string;
  unitsAtProperty: number;
  gCode: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
  ownerFullMailingAddress: string;
  landlordsId: number;
}

export default function Property() {
  return (
    <Container>
      <h3>Property Component</h3>
      <p>
        individual properties will be rendered in this absolutely stunning
        component
      </p>
    </Container>
  );
}
