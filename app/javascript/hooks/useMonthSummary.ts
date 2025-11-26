import {useQuery, UseQueryResult} from '@tanstack/react-query';
import type {MonthSummary} from '~/types';
import {useTransactionsContext} from '@/contexts/TransactionsContext';
import {fetchMonthSummary} from '~/api/months/fetchMonthSummary';

// useMonthSummary returns every memo and their total amount debit for the selected month
export default function useMonthSummary(): UseQueryResult<MonthSummary[], Error> {
    const {state} = useTransactionsContext();

    const month = state.selectedMonth;

    const enabledCondition = !!month && month.trim() !== '';

    return useQuery<Array<MonthSummary>>({
        queryKey: ['month-summary', month],
        queryFn: () => fetchMonthSummary(month),
        enabled: enabledCondition,
        refetchOnWindowFocus: false,
    });
}