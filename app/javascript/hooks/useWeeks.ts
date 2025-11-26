// src/api/hooks/transactions/useWeeks.ts
import {useQuery} from '@tanstack/react-query'
import type {WeekYear} from '@/types'
import {fetchWeeks} from '@/api/weeks/fetchWeeks'

export function useWeeks() {
    return useQuery<WeekYear[], Error>({
        queryKey: ['weeks'],
        queryFn: fetchWeeks,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}