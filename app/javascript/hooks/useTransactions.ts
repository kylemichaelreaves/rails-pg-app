// src/api/hooks/transactions/useTransactions.ts
import {useInfiniteQuery} from '@tanstack/react-query'
import {useTransactionsContext} from '@/contexts/TransactionsContext'
import {fetchTransactions} from '@/api/transactions/fetchTransactions'
import {Timeframe, Transaction} from '@/types'

export function useTransactions(filters?: {
    timeFrame?: Timeframe;
    selectedValue?: string;
}) {
    const {state, setTransactionsByOffset, getTransactionsByOffset} = useTransactionsContext()

    // Only use cache when there are no filters
    const shouldUseCache = !filters?.timeFrame && !filters?.selectedValue

    return useInfiniteQuery<Transaction[]>({
        queryKey: [
            'transactions',
            state.transactionsTableLimit,
            state.selectedMemo,
            filters?.timeFrame,
            filters?.selectedValue
        ],
        initialPageParam: 0,
        queryFn: async ({pageParam}) => {
            const offset = pageParam as number

            // Only check cache if no filters are applied
            if (shouldUseCache) {
                const cachedTransactions = getTransactionsByOffset(offset)
                if (cachedTransactions && cachedTransactions.length > 0) {
                    return cachedTransactions
                }
            }

            const transactions = await fetchTransactions({
                limit: state.transactionsTableLimit,
                offset,
                memo: state.selectedMemo,
                timeFrame: filters?.timeFrame,
                date: filters?.selectedValue
            })

            // Only cache if no filters
            if (shouldUseCache) {
                setTransactionsByOffset(offset, transactions as Transaction[])
            }

            return transactions as Transaction[]
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < state.transactionsTableLimit) {
                return undefined
            }
            return allPages.length * state.transactionsTableLimit
        },
        refetchOnWindowFocus: false,
        enabled: true,
    })
}
