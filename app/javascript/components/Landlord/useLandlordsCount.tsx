import * as React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Landlord } from "./Landlord";

async function fetchLandlords(): Promise<Landlord[]> {
  return axios
    .get("http://127.0.0.1:3000/api/v1/landlords")
    .then((res) => res.data);
}

export function useLandlordsCount() {
  const result = useQuery<Landlord[], Error, number>(
    "landlords",
    fetchLandlords,
    {
      select: (landlords: Landlord[]) => landlords.length,
    }
  );
  return <>{result.data}</>;
}
