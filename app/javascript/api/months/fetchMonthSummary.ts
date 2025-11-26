import {MonthSummary, Timeframe} from "~/types";
import {fetchSummary} from "~/api/summaries/fetchSummary";


export async function fetchMonthSummary(monthId: string): Promise<MonthSummary[]> {
    try {
        return await fetchSummary(Timeframe.Month, monthId)
    } catch (err) {
        console.error('Error fetching month summary:', err)
        throw err
    }
}