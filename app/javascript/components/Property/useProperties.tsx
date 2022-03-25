import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { Property } from "./useProperty";

export async function fetchProperties(
  pageParam: number | undefined
): Promise<Property[]> {
  return typeof pageParam === "undefined"
    ? Promise.reject(new Error("Invalid pageParam"))
    : await axios
        .get("http://127.0.0.1:3000/api/v1/properties?cursor=" + pageParam)
        .then((response) => response.data);
}

export default function useProperties<TData = Property[]>(
  pageParam: number | undefined
) {
  return useQuery<Property[], AxiosError, TData>(
    ["properties", pageParam],
    () => fetchProperties(pageParam),
    { keepPreviousData: true, staleTime: 5000 }
  );
}
