import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {URL_PATH, API_GATEWAY} from "~//constants";

export interface LandlordInterface {
    id: number;
    name: string;
    mailing_address: string;
    city_state_zip: string;
    full_mailing_address: string;
}

export interface LandlordsInterface {
    rows: Array<LandlordInterface>
}

export const getLandlordById = async (
    id: number | undefined
): Promise<LandlordInterface> => {
    return await axios
        .get(`${URL_PATH}/${id}`)
        .then((response) => response.data);
};

export const getLandlordsByName = async (
    name: string | undefined
): Promise<LandlordsInterface> => {
    return typeof name === "undefined"
        ? Promise.reject(new Error("Invalid search"))
        : await axios
            .get(`${API_GATEWAY}/landlords?search=${name}`)
            .then((response) => response.data);
}

export async function fetchLandlords(pageParam: number): Promise<LandlordsInterface> {
    return typeof pageParam === "undefined"
        ? Promise.reject(new Error("Invalid pageParam"))
        : await axios
            .get(`${URL_PATH}/landlords?page=${pageParam}`)
            .then((response) => response.data);
}

export default function useLandlord(id: number) {
    return useQuery(["landlord", id], () => getLandlordById(id), {
        enabled: !!id,
    }).data;
}

export function useLandlords<TData = LandlordsInterface>(
    search: string | undefined
) {
    return useQuery<LandlordsInterface, AxiosError, TData>(
        ["landlords", search],
        () => getLandlordsByName(search), {
            enabled: false,
            keepPreviousData: true,
            staleTime: 5000
        }).data;
}
