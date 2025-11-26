import {httpClient} from "~/api/httpClient";


export async function fetchSumAmountDebitByDate(
    timeFrame: string,
    date: string,
    totalAmountDebit = true
): Promise<Array<{ total_amount_debit: number }>> {
    try {
        const res = await httpClient.get('/transactions', {
            params: {
                timeFrame,
                date,
                totalAmountDebit,
            },
        });
        return res.data;
    } catch (err) {
        console.error('Error fetching sum amount debit by date:', {timeFrame, date, totalAmountDebit}, err);
        throw err; // Re-throw so React Query can handle the error state
    }
}