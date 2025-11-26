import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {fetchSumAmountDebitByDate} from "~/api/transactions/fetchSumAmountDebitByDate";


export default function useSumAmountDebitByDate(
    timeFrame: string,
    date: string | undefined
): UseQueryResult<Array<{ total_amount_debit: number }>, Error> {
    return useQuery({
        queryKey: ['sum-amount-debit-by-date', timeFrame, date],
        queryFn: () => fetchSumAmountDebitByDate(timeFrame, date),
        refetchOnWindowFocus: false,
        enabled: !!date && date.trim() !== '',
    });
}