import {describe, it, expect} from 'vitest'
import {renderHook, act} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import {TransactionsProvider, useTransactionsContext} from '../../../app/javascript/contexts/TransactionsContext'
import type {Memo, Transaction} from '../../../app/javascript/types'
import React from "react";

describe('TransactionsContext', () => {
    const wrapper = ({children}: { children: React.ReactNode }) => (
        <TransactionsProvider>{children}</TransactionsProvider>
    )

    describe('Initial State', () => {
        it('should initialize with default values', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            expect(result.current.state.selectedMemo).toBeUndefined()
            expect(result.current.state.selectedMonth).toBeUndefined()
            expect(result.current.state.memosByOffset).toEqual({})
            expect(result.current.state.memosTableLimit).toBe(100)
            expect(result.current.state.transactionsTableLimit).toBe(50)
            expect(result.current.state.transactionsByOffset).toEqual({})
        })
    })

    describe('setSelectedMemo', () => {
        it('should update selectedMemo', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setSelectedMemo('Test Memo')
            })

            expect(result.current.state.selectedMemo).toBe('Test Memo')
        })

        it('should clear selectedMemo when set to undefined', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setSelectedMemo('Test Memo')
            })

            expect(result.current.state.selectedMemo).toBe('Test Memo')

            act(() => {
                result.current.setSelectedMemo(undefined)
            })

            expect(result.current.state.selectedMemo).toBeUndefined()
        })
    })

    describe('setSelectedMonth', () => {
        it('should update selectedMonth', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setSelectedMonth('2025-11')
            })

            expect(result.current.state.selectedMonth).toBe('2025-11')
        })

        it('should clear selectedMonth when set to undefined', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setSelectedMonth('2025-11')
            })

            expect(result.current.state.selectedMonth).toBe('2025-11')

            act(() => {
                result.current.setSelectedMonth(undefined)
            })

            expect(result.current.state.selectedMonth).toBeUndefined()
        })
    })

    describe('setTableLimit', () => {
        it('should update transactionsTableLimit', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setTableLimit(100)
            })

            expect(result.current.state.transactionsTableLimit).toBe(100)
        })

        it('should handle various limit values', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setTableLimit(10)
            })

            expect(result.current.state.transactionsTableLimit).toBe(10)

            act(() => {
                result.current.setTableLimit(500)
            })

            expect(result.current.state.transactionsTableLimit).toBe(500)
        })
    })

    describe('Transactions Cache Management', () => {
        const mockTransactions: Transaction[] = [
            {
                id: 1,
                date: '2025-11-20',
                description: 'Test Transaction 1',
                memo: 'Test Memo',
                amount_debit: '100.00',
                amount_credit: '0.00',
            },
            {
                id: 2,
                date: '2025-11-19',
                description: 'Test Transaction 2',
                memo: 'Test Memo',
                amount_debit: '50.00',
                amount_credit: '0.00',
            },
        ]

        it('should set transactions by offset', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setTransactionsByOffset(0, mockTransactions)
            })

            expect(result.current.state.transactionsByOffset[0]).toEqual(mockTransactions)
        })

        it('should get transactions by offset', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setTransactionsByOffset(0, mockTransactions)
            })

            const transactions = result.current.getTransactionsByOffset(0)
            expect(transactions).toEqual(mockTransactions)
        })

        it('should handle multiple offsets', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const secondBatch: Transaction[] = [
                {
                    id: 3,
                    date: '2025-11-18',
                    description: 'Test Transaction 3',
                    memo: 'Another Memo',
                    amount_debit: '75.00',
                    amount_credit: '0.00',
                },
            ]

            act(() => {
                result.current.setTransactionsByOffset(0, mockTransactions)
                result.current.setTransactionsByOffset(50, secondBatch)
            })

            expect(result.current.getTransactionsByOffset(0)).toEqual(mockTransactions)
            expect(result.current.getTransactionsByOffset(50)).toEqual(secondBatch)
        })

        it('should return undefined for non-existent offset', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const transactions = result.current.getTransactionsByOffset(100)
            expect(transactions).toBeUndefined()
        })

        it('should clear cache', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setTransactionsByOffset(0, mockTransactions)
            })

            expect(result.current.state.transactionsByOffset[0]).toEqual(mockTransactions)

            act(() => {
                result.current.clearCache()
            })

            expect(result.current.state.transactionsByOffset).toEqual({})
            expect(result.current.getTransactionsByOffset(0)).toBeUndefined()
        })
    })

    describe('Memos Management', () => {
        const mockMemos: Memo[] = [
            {
                id: 1,
                name: 'Test Memo 1',
                recurring: true,
                necessary: true,
                ambiguous: false,
                frequency: 'monthly',
                budget_category: 'Food',
                transactions_count: 10,
            },
            {
                id: 2,
                name: 'Test Memo 2',
                recurring: false,
                necessary: false,
                ambiguous: true,
                transactions_count: 5,
            },
        ]

        it('should set memos table limit', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setMemosTableLimit(200)
            })

            expect(result.current.state.memosTableLimit).toBe(200)
        })

        it('should set memos by offset', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setMemosByOffset(0, mockMemos)
            })

            expect(result.current.state.memosByOffset[0]).toEqual(mockMemos)
        })

        it('should get memos by offset', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            act(() => {
                result.current.setMemosByOffset(0, mockMemos)
            })

            const memos = result.current.getMemosByOffset(0)
            expect(memos).toEqual(mockMemos)
        })

        it('should handle multiple memo offsets', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const secondBatch: Memo[] = [
                {
                    id: 3,
                    name: 'Test Memo 3',
                    recurring: true,
                    necessary: true,
                    ambiguous: false,
                    transactions_count: 15,
                },
            ]

            act(() => {
                result.current.setMemosByOffset(0, mockMemos)
                result.current.setMemosByOffset(100, secondBatch)
            })

            expect(result.current.getMemosByOffset(0)).toEqual(mockMemos)
            expect(result.current.getMemosByOffset(100)).toEqual(secondBatch)
        })

        it('should return undefined for non-existent memo offset', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const memos = result.current.getMemosByOffset(200)
            expect(memos).toBeUndefined()
        })
    })

    describe('Context Error Handling', () => {
        it('should throw error when used outside provider', () => {
            expect(() => {
                renderHook(() => useTransactionsContext())
            }).toThrow('useTransactionsContext must be used within TransactionsProvider')
        })
    })

    describe('Complex State Updates', () => {
        it('should handle multiple state updates correctly', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const mockTransactions: Transaction[] = [
                {
                    id: 1,
                    date: '2025-11-20',
                    description: 'Test',
                    memo: 'Test Memo',
                    amount_debit: '100.00',
                    amount_credit: '0.00',
                },
            ]

            const mockMemos: Memo[] = [
                {
                    id: 1,
                    name: 'Test Memo',
                    recurring: true,
                    necessary: true,
                    ambiguous: false,
                    transactions_count: 10,
                },
            ]

            act(() => {
                result.current.setSelectedMemo('Test Memo')
                result.current.setSelectedMonth('2025-11')
                result.current.setTableLimit(75)
                result.current.setMemosTableLimit(150)
                result.current.setTransactionsByOffset(0, mockTransactions)
                result.current.setMemosByOffset(0, mockMemos)
            })

            expect(result.current.state.selectedMemo).toBe('Test Memo')
            expect(result.current.state.selectedMonth).toBe('2025-11')
            expect(result.current.state.transactionsTableLimit).toBe(75)
            expect(result.current.state.memosTableLimit).toBe(150)
            expect(result.current.state.transactionsByOffset[0]).toEqual(mockTransactions)
            expect(result.current.state.memosByOffset[0]).toEqual(mockMemos)
        })

        it('should preserve unrelated state when updating', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const mockTransactions: Transaction[] = [
                {
                    id: 1,
                    date: '2025-11-20',
                    description: 'Test',
                    memo: 'Test Memo',
                    amount_debit: '100.00',
                    amount_credit: '0.00',
                },
            ]

            act(() => {
                result.current.setSelectedMemo('Test Memo')
                result.current.setTransactionsByOffset(0, mockTransactions)
            })

            const initialTableLimit = result.current.state.transactionsTableLimit

            act(() => {
                result.current.setSelectedMonth('2025-11')
            })

            expect(result.current.state.selectedMemo).toBe('Test Memo')
            expect(result.current.state.transactionsTableLimit).toBe(initialTableLimit)
            expect(result.current.state.transactionsByOffset[0]).toEqual(mockTransactions)
        })

        it('should clear only transactions cache, not memos cache', () => {
            const {result} = renderHook(() => useTransactionsContext(), {wrapper})

            const mockTransactions: Transaction[] = [
                {
                    id: 1,
                    date: '2025-11-20',
                    description: 'Test',
                    memo: 'Test Memo',
                    amount_debit: '100.00',
                    amount_credit: '0.00',
                },
            ]

            const mockMemos: Memo[] = [
                {
                    id: 1,
                    name: 'Test Memo',
                    recurring: true,
                    necessary: true,
                    ambiguous: false,
                    transactions_count: 10,
                },
            ]

            act(() => {
                result.current.setTransactionsByOffset(0, mockTransactions)
                result.current.setMemosByOffset(0, mockMemos)
            })

            expect(result.current.state.transactionsByOffset[0]).toEqual(mockTransactions)
            expect(result.current.state.memosByOffset[0]).toEqual(mockMemos)

            act(() => {
                result.current.clearCache()
            })

            expect(result.current.state.transactionsByOffset).toEqual({})
            expect(result.current.state.memosByOffset[0]).toEqual(mockMemos)
        })
    })
})

