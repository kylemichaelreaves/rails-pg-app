import {httpClient} from '@/api/httpClient'
import {Timeframe} from "~/types";

export async function fetchSummary(timeframe: Timeframe, dateString: string): Promise<any[]> {

    // pluralize the timeframe before constructing the URL
    const pluralTimeframe = timeframe.endsWith('s') ? timeframe : `${timeframe}s`

    try {
        const response = await httpClient.get(
            `/transactions/${pluralTimeframe}/${dateString}/summary`
        )
        return response.data
    } catch (err) {
        console.error('Error fetching summary:', {timeframe, dateString}, err)
        throw err
    }
}