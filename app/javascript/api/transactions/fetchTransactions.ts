import {httpClient} from '@/api/httpClient'
import type {TransactionQueryParams} from '@/types'

export async function fetchTransactions(queryParams: TransactionQueryParams) {
    const params: Record<string, any> = {
        limit: queryParams.limit,
        offset: queryParams.offset
    }

    // Add memo filter if present
    if (queryParams.memo) {
        params.memo_id = queryParams.memo
    }

    // Add timeframe and date filters if present
    if (queryParams.timeFrame && queryParams.date) {
        params.timeFrame = queryParams.timeFrame
        // Use the timeFrame as the key for the date parameter
        params[queryParams.timeFrame as string] = queryParams.date
    }

    console.log('Query Params:', params)

    try {
        const response = await httpClient.get('/transactions', {params})
        return response.data
    } catch (err) {
        console.error('Error fetching transactions:', err)
        throw err
    }
}
