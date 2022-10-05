import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export interface LandlordInterface {
    landlordId: number;
    name: string;
    mailing_address: string;
    city_state_zip: string;
    full_mailing_address: string;
}

export const getLandlordById = async (
    id: number | undefined
): Promise<LandlordInterface> => {
    return await axios
        .get(`api/v1/properties/${id}`)
        .then((response) => response.data);
};

export default function useLandlord(id: number) {
    return useQuery(["landlord", id], () => getLandlordById(id), {
        enabled: !!id,
    }).data;
}
