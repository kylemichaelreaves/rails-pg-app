import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {AddressInterface as Address} from "./Address";

async function fetchAddresses(): Promise<Address[]> {
    return axios
        .get("http://127.0.0.1:3000/api/v1/addresses")
        .then((res) => res.data);
}

export default function UseAddressesCount() {
    const result = useQuery<Address[], Error, number>(
        ["addresses"],
        fetchAddresses,
        {
            select: (addresses: Address[]) => addresses.length,
        }
    );
    return <>{result.data}</>;
}
