import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Property } from "./NewProperty";

export interface Landlord {
    id: number;
    name: string;
    mailing_address: string;
    full_mailing_address: string;
    properties_owned: Property[];
  }

const defaultLandlordProps: Landlord = {
    id: 0,
    name: "",
    mailing_address: "",
    full_mailing_address: "",
    properties_owned: [],
  };


export default function NewLandlord() {

}