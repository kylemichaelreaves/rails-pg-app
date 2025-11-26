import {httpClient} from '@/api/httpClient'
import {Frequency} from "~/types";

// fetchSummaries returns a summary of the entire series for a given frequency
// TODO we need to update the routes and controller to support this endpoint

export async function fetchSummaries(frequency: Frequency): Promise<any[]> {
    try {
        const response = await httpClient.get(
            `/transactions/${frequency}/summary`
        )
        return response.data
    } catch (err) {
        console.error('Error fetching summaries for frequency:', frequency, err)
        throw err
    }
}