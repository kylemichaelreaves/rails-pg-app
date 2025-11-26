// src/api/hooks/transactions/useDays.ts
import {useQuery} from '@tanstack/react-query'
import type {DayYear} from '@/types'
import {fetchDays} from '@/api/days/fetchDays'

export function useDays() {
    return useQuery<DayYear[], Error>({
        queryKey: ['days'],
        queryFn: fetchDays,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    })
}