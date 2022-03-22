import * as React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "./NavBar";
import GeocoderForm from "./GeocoderForm";
import { Address } from "./GeocoderForm";

export default function Home() {
  const [addresses, setAddresses] = React.useState<Address[]>([]);

  function addAddress(address: Address) {
    setAddresses([...addresses, address]);
  }

  return (
    <Container>
      <h1 className="display-4">Find My Landlord: North Jersey</h1>
      <NavBar />
      <br />
      <h5>Home Component</h5>
      <br />
      <h6>Geocoder Component:</h6>
      <GeocoderForm onSave={addAddress} />
    </Container>
  );
}
