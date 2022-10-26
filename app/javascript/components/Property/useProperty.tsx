import {useQuery} from "@tanstack/react-query";
import {getPropertyById} from "./getPropertyById";

export interface PropertyInterface {
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
    landlord_id: number;
    address_id: number;
}

export const blankProperty: PropertyInterface = {
    id: 0,
    street_address: "",
    owner_name: "",
    owner_mailing_address: "",
    city_state_zip: "",
    property_full_address: "",
    units_at_property: 0,
    g_code: "",
    latitude: 0,
    longitude: 0,
    created_at: "",
    updated_at: "",
    owner_full_mailing_address: "",
    landlord_id: 0,
    address_id: 0,
};

export default function useProperty(id: number) {
    return useQuery(["property", id], () => getPropertyById(id), {
        enabled: !!id,
    }).data;
}
