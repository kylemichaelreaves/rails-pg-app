// src/api/hooks/transactions/useMonths.ts
import {useQuery} from '@tanstack/react-query'
import type {MonthYear} from '@/types'
import {fetchMonths} from '@/api/months/fetchMonths'

export function useMonths() {
    return useQuery<MonthYear[], Error>({
        queryKey: ['months'],
        queryFn: fetchMonths,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}