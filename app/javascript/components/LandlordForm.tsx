import * as React from "react";
import Form from "react-bootstrap/Form";

export default function LandlordForm() {
  return (
    <>
      <Form.Label htmlFor="inputName">Name</Form.Label>
      <Form.Control
        type="ownerName"
        id="ownerNameInput"
        aria-describedby="ownerNameHelpBlock"
      />
      <Form.Label htmlFor="inputMailingAddress">Mailing Address</Form.Label>
      <Form.Control
        type="ownerMailingAddress"
        id="ownerMailingAddressInput"
        aria-describedby="ownerMailingAddressHelpBlock"
      />
      <Form.Label htmlFor="inputCityStateZip">City State Zip</Form.Label>
      <Form.Control
        type="ownerCityStateZip"
        id="ownerCityStateZipInput"
        aria-describedby="ownerCityStateZipHelpBlock"
      />
      {/* owner_full_mailing_address is a concatenation of the second and third inputs, and should be auto-populated */}
      {/* properties_owned if not in a select/filter list…trigger a PropertyForm */}
    </>
  );
}
