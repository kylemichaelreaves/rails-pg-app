import {httpClient} from '@/api/httpClient'
import {Memo} from "~/types";

export async function fetchMemo(memoId: string): Promise<Memo> {
    try {
        const response = await httpClient.get(`/memos/${memoId}`)
        return response.data
    } catch (err) {
        console.error('Error fetching memo:', err)
        throw err
    }
}