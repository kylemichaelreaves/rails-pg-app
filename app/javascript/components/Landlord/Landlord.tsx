import * as React from "react";
import { useParams } from "react-router-dom";
import useLandlord from "./useLandlord";

export interface LandlordInterface {
  id: number;
  name: string;
  mailing_address: string;
  city_state_zip: string;
  full_mailing_address: string;
}

export default function Landlord({ id }: { id: number }) {
  const params = useParams();
  const landlord = useLandlord(parseInt(params.landlordsId, 10));

  const { name, mailing_address, city_state_zip, full_mailing_address } =
    landlord || {};

  return landlord ? (
    <>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>Mailing Address: {mailing_address}</p>
      <p>City, State, Zip: {city_state_zip}</p>
      <p>Full Mailing Address: {full_mailing_address}</p>
    </>
  ) : (
    <p>Loading…</p>
  );
}
