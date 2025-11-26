// src/api/hooks/transactions/useMemos.ts
import {useInfiniteQuery} from '@tanstack/react-query'
import {fetchMemos} from '@/api/memos/fetchMemos'
import type {Memo} from '@/types'
import {useTransactionsContext} from '@/contexts/TransactionsContext'

export function useMemos() {
    const {state, setMemosByOffset, getMemosByOffset} = useTransactionsContext()

    return useInfiniteQuery<Memo[]>({
        queryKey: ['memos', state.memosTableLimit],
        initialPageParam: 0,
        queryFn: async ({pageParam}) => {
            const offset = pageParam as number

            // Check cache first
            const cachedMemos = getMemosByOffset(offset)
            if (cachedMemos && cachedMemos.length > 0) {
                return cachedMemos
            }

            // Fetch from API
            const memos = await fetchMemos({
                limit: state.memosTableLimit,
                offset,
            })

            // Cache results
            setMemosByOffset(offset, memos)

            return memos
        },
        getNextPageParam: (lastPage, allPages) => {
            // No more pages if last page is smaller than limit
            if (lastPage.length < state.memosTableLimit) {
                return undefined
            }
            // Next offset = number of pages * limit
            return allPages.length * state.memosTableLimit
        },
        refetchOnWindowFocus: false,
    })
}