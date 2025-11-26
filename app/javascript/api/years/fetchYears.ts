import {httpClient} from "@/api/httpClient";
import type {Year} from "@/types";


export async function fetchYears(): Promise<Array<Year>> {
    try {
        const res = await httpClient.get(`/transactions/years`)
        return res.data
    } catch (err) {
        console.error('Error fetching years:', err)
        throw err
    }
}