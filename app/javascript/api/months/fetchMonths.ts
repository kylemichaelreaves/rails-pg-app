import {httpClient} from '@/api/httpClient'
import type {MonthYear} from '@/types'


export async function fetchMonths(): Promise<Array<MonthYear>> {
    try {
        const res = await httpClient.get(`/transactions/months`)
        return res.data
    } catch (err) {
        console.error('Error fetching months:', err)
        throw err
    }
}