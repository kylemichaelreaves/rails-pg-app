import * as React from "react";

export type Landlord = {
  id: number;
  name: string;
  mailingAddress: string;
  cityStateZip: string;
  fullMailingAddress: string;
}

export default function Landlord() {
  return <div>Landlord</div>;
}
