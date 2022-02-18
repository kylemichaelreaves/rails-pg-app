import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Property } from "./PropertyTable";

export interface Landlord {
    id: number,
    name: string,
    mailing_address: string,
    city_state_zip: string,
    full_mailing_address: string,
    properties_owned: Property[],
  }

export const defaultLandlordProps: Landlord = {
    id: 0,
    name: "",
    mailing_address: "",
    city_state_zip: "",
    full_mailing_address: "",
    properties_owned: []
  };


export default function Landlord() {

}
