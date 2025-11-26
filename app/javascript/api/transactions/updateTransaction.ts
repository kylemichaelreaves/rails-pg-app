import {httpClient} from '@/api/httpClient';
import {Transaction} from '@/types';

export const updateTransaction = async (transactionId: number, updatedData: Partial<Transaction>): Promise<Transaction> => {
    if (!transactionId) {
        throw new Error('Transaction ID is required to update a transaction.');
    }

    try {
        const response = await httpClient.patch<Transaction>(`/transactions/${transactionId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }

};