import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {PropertyInterface} from "./useProperty";

export async function fetchProperties(pageParam: number): Promise<PropertyInterface[]> {
    return typeof pageParam === "undefined"
        ? Promise.reject(new Error("Invalid pageParam"))
        : await axios
            .get("properties?page=" + pageParam)
            .then((response) => response.data);
}

export default function useProperties<TData = PropertyInterface[]>(
    pageParam: number | undefined
) {
    return useQuery<PropertyInterface[], AxiosError, TData>(
        ["properties", pageParam],
        () => fetchProperties(pageParam),
        {keepPreviousData: true, staleTime: 5000}
    );
}
