import {httpClient} from '@/api/httpClient'
import {Transaction} from "~/types";

export async function fetchTransaction(transactionId: string): Promise<Transaction> {
    try {
        const response = await httpClient.get(`/transactions/${transactionId}`)
        return response.data
    } catch (err) {
        console.error('Error fetching transaction:', err)
        throw err
    }
}