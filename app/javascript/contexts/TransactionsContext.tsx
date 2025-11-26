import {createContext, ReactNode, useCallback, useContext, useMemo, useReducer} from 'react'
import type {Memo, Transaction, TransactionsAction, TransactionsContextType, TransactionsState} from '@/types'


const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

const initialState: TransactionsState = {
    selectedMemo: undefined,
    selectedMonth: undefined,
    memosByOffset: {},
    memosTableLimit: 100,
    transactionsTableLimit: 50,
    transactionsByOffset: {},
}

function transactionsReducer(state: TransactionsState, action: TransactionsAction): TransactionsState {
    switch (action.type) {
        case 'SET_SELECTED_MEMO':
            return {...state, selectedMemo: action.payload}

        case 'SET_SELECTED_MONTH':
            return {...state, selectedMonth: action.payload}

        case 'SET_TABLE_LIMIT':
            return {...state, transactionsTableLimit: action.payload}
        case 'SET_TRANSACTIONS_BY_OFFSET':
            return {
                ...state,
                transactionsByOffset: {
                    ...state.transactionsByOffset,
                    [action.payload.offset]: action.payload.transactions,
                },
            }
        case 'CLEAR_CACHE':
            return {...state, transactionsByOffset: {}}

        case 'SET_MEMOS_TABLE_LIMIT':
            return {...state, memosTableLimit: action.payload}
        case 'SET_MEMOS_BY_OFFSET':
            return {
                ...state,
                memosByOffset: {
                    ...state.memosByOffset,
                    [action.payload.offset]: action.payload.memos,
                },
            }

        default:
            return state
    }
}

export function TransactionsProvider({children}: Readonly<{ children: ReactNode }>) {
    const [state, dispatch] = useReducer(transactionsReducer, initialState)

    const setSelectedMemo = useCallback((memo: string | undefined) => {
        dispatch({type: 'SET_SELECTED_MEMO', payload: memo})
    }, [])

    const setSelectedMonth = useCallback((month: string | undefined) => {
        dispatch({type: 'SET_SELECTED_MONTH', payload: month})
    }, [])


    const setTableLimit = useCallback((limit: number) => {
        dispatch({type: 'SET_TABLE_LIMIT', payload: limit})
    }, [])

    const setTransactionsByOffset = useCallback((offset: number, transactions: Transaction[]) => {
        dispatch({type: 'SET_TRANSACTIONS_BY_OFFSET', payload: {offset, transactions}})
    }, [])

    const getTransactionsByOffset = useCallback((offset: number) => {
        return state.transactionsByOffset[offset]
    }, [state.transactionsByOffset])

    const clearCache = useCallback(() => {
        dispatch({type: 'CLEAR_CACHE'})
    }, [])

    const setMemosTableLimit = useCallback((limit: number) => {
        dispatch({type: 'SET_MEMOS_TABLE_LIMIT', payload: limit})
    }, [])

    const setMemosByOffset = useCallback((offset: number, memos: Memo[]) => {
        dispatch({type: 'SET_MEMOS_BY_OFFSET', payload: {offset, memos}})
    }, [])

    const getMemosByOffset = useCallback(
        (offset: number) => {
            return state.memosByOffset[offset]
        },
        [state.memosByOffset]
    )

    const value = useMemo(
        () => ({
            state,
            setSelectedMemo,
            setSelectedMonth,
            setTableLimit,
            setTransactionsByOffset,
            getTransactionsByOffset,
            getMemosByOffset,
            setMemosByOffset,
            setMemosTableLimit,
            clearCache,
        }),
        [state, setSelectedMemo, setSelectedMonth, setTableLimit, setTransactionsByOffset, getTransactionsByOffset, getMemosByOffset, clearCache, setMemosByOffset, setMemosTableLimit]
    )

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactionsContext() {
    const context = useContext(TransactionsContext)
    if (!context) {
        throw new Error('useTransactionsContext must be used within TransactionsProvider')
    }
    return context
}