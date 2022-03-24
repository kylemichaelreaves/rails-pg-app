import { useQuery } from "react-query";
import axios from "axios";
import { Property } from "./useProperty";

export async function fetchProperties(pageParam: number | undefined): Promise<Property[]> {
  return typeof pageParam === 'undefined'
    ? Promise.reject(new Error('invalid pageParam'))
    : await axios.get("http://127.0.0.1:3000/api/v1/properties?cursor=" + pageParam).then((response) => response.data);
}

export default function useProperties(page?: number | undefined) {
  return useQuery(
    ["properties", page],
    () => fetchProperties(page),
    { keepPreviousData: true, staleTime: 5000 }
  );
}
