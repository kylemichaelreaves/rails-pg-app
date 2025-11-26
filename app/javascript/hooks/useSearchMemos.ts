// src/hooks/useSearchMemos.ts
import {useQuery} from '@tanstack/react-query'
import {fetchMemos} from '@/api/memos/fetchMemos'
import type {Memo} from '@/types'

interface UseSearchMemosOptions {
    searchTerm: string
    enabled?: boolean
    limit?: number
}

export function useSearchMemos({searchTerm, enabled = true, limit = 20}: UseSearchMemosOptions) {
    return useQuery<Memo[]>({
        queryKey: ['memos', 'search', searchTerm, limit],
        queryFn: async () => {
            if (!searchTerm || searchTerm.trim().length === 0) {
                return []
            }

            return await fetchMemos({
                memoName: searchTerm,
                limit,
            })
        },
        enabled: enabled && searchTerm.trim().length > 0,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

