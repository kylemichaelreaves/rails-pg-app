import type {DayYear} from '@/types'
import {httpClient} from '@/api/httpClient'


export async function fetchDays(): Promise<Array<DayYear>> {
    try {
        const res = await httpClient.get(`/transactions/days`)
        return res.data
    } catch (err) {
        console.error('Error fetching days:', err)
        throw err
    }
}