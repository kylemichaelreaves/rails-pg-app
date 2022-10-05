import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {LandlordInterface} from "./useLandlord";

async function fetchLandlords(): Promise<LandlordInterface[]> {
    return axios
        .get("http://127.0.0.1:3000/api/v1/landlords")
        .then((res) => res.data);
}

export function useLandlordsCount() {
    const result = useQuery<LandlordInterface[], Error, number>(
        ["landlords"],
        fetchLandlords,
        {
            select: (landlords: LandlordInterface[]) => landlords.length,
        }
    );
    return <>{result.data}</>;
}
