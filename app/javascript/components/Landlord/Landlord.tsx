import * as React from "react";

export type Landlord = {
  id: number;
  name: string;
  mailing_address: string;
  city_state_zip: string;
  full_mailing_address: string;
}

export default function Landlord() {
  return <div>Landlord</div>;
}
