import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Landlord } from "./Landlord";

export interface Property {
  id: number;
  street_address: string;
  owner_name: string;
  owner_mailing_address: string;
  city_state_zip: string;
  owner_full_mailing_address: string;
  property_full_address: string;
  units_at_property: number;
  g_code: string;
  latitude: number;
  longitude: number;
}

const defaultPropertyProps: Property = {
  id: 0,
  street_address: "",
  owner_name: "",
  owner_mailing_address: "",
  city_state_zip: "",
  owner_full_mailing_address: "",
  property_full_address: "",
  units_at_property: 0,
  g_code: "",
  latitude: 0,
  longitude: 0,
};

export default function Property() {
  // const [property, setProperty] =
  //   React.useState<Property>(defaultPropertyProps);
    return (
      <>
      <h1>Property, a React Function Component in Rails 7</h1>
      <h1>not me finally integrating Rails (7.0.2.2) and React (17.0.2) with react-rails by correctly importing from the components folder…</h1>
      </>
    )
}
