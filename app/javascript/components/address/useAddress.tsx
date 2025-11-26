import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {AddressInterface} from "./Address";

export const getAddressById = async (
    id: number | undefined
): Promise<AddressInterface> => {
    return await axios
        .get(`api/v1/addresses/${id}`)
        .then((response) => response.data);
};

export const createAddress = async (
    address: AddressInterface
): Promise<AddressInterface> => {
    return await axios
        .post(`api/v1/addresses`, address)
        .then((response) => response.data);
}

export const useAddress = async (id: number) => {
    return useQuery(["address", id], () => getAddressById(id), {
        enabled: !!id,
    }).data;
}
