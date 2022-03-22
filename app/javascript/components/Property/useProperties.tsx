import { useQuery } from "react-query";
import axios from "axios";
import { Property } from "./useProperty";

export async function fetchProperties(pageParam: any) {
  return await axios
    .get("http://127.0.0.1:3000/api/v1/properties?page=" + pageParam)
    .then((response) => response.data);
}

export default function useProperties(page: number = 0) {
  return useQuery<Property[], Error>(
    ["properties", page],
    () => fetchProperties(page),
    { keepPreviousData: true, staleTime: 5000 }
  );
}