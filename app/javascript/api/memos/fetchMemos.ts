import type {Memo, MemoQueryParams} from '@/types'
import {httpClient} from '@/api/httpClient'


export async function fetchMemos(queryParams: MemoQueryParams): Promise<Array<Memo>> {
    try {
        const res = await httpClient.get(`/memos`, {
            params: queryParams
        })
        return res.data
    } catch (err) {
        console.error('Error fetching memos:', {queryParams}, err)
        throw err
    }
}