import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export interface PropertyProps {
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

const defaultPropertyProps: PropertyProps = {
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

export default function PropertyLoader({ propertyId, children }) {
  const [property, setProperty] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(`/properties/${propertyId}`);
      setProperty(response.data);
    })();
  }, []);
  return (
    <>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {})
      }
      return child
    })}
    </>
  )
}