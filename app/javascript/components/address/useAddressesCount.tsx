import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {AddressInterface as Address} from "./Address";
import {URL_PATH} from "~//constants";

async function fetchAddresses(): Promise<Address[]> {
    return axios
        .get(`${URL_PATH}/addresses`)
        .then((res) => res.data);
}

export default function AddressesCount() {
    const result = useQuery<Address[], Error, number>(
        ["addresses"],
        fetchAddresses,
        {
            select: (addresses: Address[]) => addresses.length,
        }
    );
    return <>{result.data}</>;
}
