import { useQuery } from "react-query";
import { getPropertyById } from "./getPropertyById";

export interface PropertyProp {
  id: number;
  street_address: string;
  owner_name: string;
  owner_mailing_address: string;
  city_state_zip: string;
  property_full_address: string;
  units_at_property: number;
  g_code: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  owner_full_mailing_address: string;
  landlords_id: number;
}

export default function useProperty(propertyId: number) {
  return useQuery(["property", propertyId], () => getPropertyById(propertyId), {
    enabled: !!propertyId,
  });
}
