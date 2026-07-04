import {useQuery, keepPreviousData} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {PropertyInterface} from "./useProperty";

export async function fetchProperties(pageParam: number | undefined): Promise<PropertyInterface[]> {
    return typeof pageParam === "undefined"
        ? Promise.reject(new Error("Invalid pageParam"))
        : await axios
            .get("properties?page=" + pageParam)
            .then((response) => response.data);
}

export default function useProperties<TData = PropertyInterface[]>(
    pageParam: number | undefined
) {
    return useQuery<PropertyInterface[], AxiosError, TData>({
        queryKey: ["properties", pageParam],
        queryFn: () => fetchProperties(pageParam),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });
}
