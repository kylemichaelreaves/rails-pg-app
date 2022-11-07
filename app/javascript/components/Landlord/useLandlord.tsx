import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {URL_PATH} from "~//constants";

export interface LandlordInterface {
    id: number;
    name: string;
    mailing_address: string;
    city_state_zip: string;
    full_mailing_address: string;
}

export interface LandlordsInterface {
    landlords: Array<LandlordInterface>
}

export const getLandlordById = async (
    id: number | undefined
): Promise<LandlordInterface> => {
    return await axios
        .get(`${URL_PATH}/${id}`)
        .then((response) => response.data);
};

export const getLandlordsByName = async (
    search: string | undefined
): Promise<LandlordInterface[]> => {
    return typeof search === "undefined"
        ? Promise.reject(new Error("Invalid search"))
        : await axios
            .get(`${URL_PATH}/landlords?search=${search}`)
            .then((response) => response.data);
}

export async function fetchLandlords(pageParam: number): Promise<LandlordInterface[]> {
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

export function useLandlords<TData = LandlordInterface[]>(
    search: string | undefined
) {
    return useQuery<LandlordInterface[], AxiosError, TData>(
        ["landlords", search],
        () => getLandlordsByName(search), {
            enabled: false,
            keepPreviousData: true,
            staleTime: 5000
        }).data;
}
