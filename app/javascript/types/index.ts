export interface TransactionsState {
    selectedMemo: string | undefined
    selectedMonth: string | undefined
    memosTableLimit: number
    memosByOffset: Record<number, Memo[]>
    transactionsTableLimit: number
    transactionsByOffset: Record<number, Transaction[]>
}

export interface DayYear {
    day: string;
}

export interface WeekYear {
    week_year: string;
}

export interface MonthSummary {
    memo: string;
    total_amount_debit: number;
    budget_category: string;
}


export interface MonthYear {
    month_year: string;
}

export interface Year {
    year: string;
}

export interface MemoQueryParams {
    memoName?: string;
    date?: string;
    timeFrame?: Timeframe;
    limit?: number;
    offset?: number;
    count?: boolean;
}


export type TransactionsAction =
    | { type: 'SET_SELECTED_MEMO'; payload: string | undefined }
    | { type: 'SET_SELECTED_MONTH'; payload: string | undefined }
    | { type: 'SET_TABLE_LIMIT'; payload: number }
    | { type: 'SET_TRANSACTIONS_BY_OFFSET'; payload: { offset: number; transactions: Transaction[] } }
    | { type: 'CLEAR_CACHE' }
    | { type: 'SET_MEMOS_TABLE_LIMIT'; payload: number }
    | { type: 'SET_MEMOS_BY_OFFSET'; payload: { offset: number; memos: Memo[] } }


export interface TransactionsContextType {
    state: TransactionsState
    setSelectedMemo: (memo: string | undefined) => void
    setSelectedMonth: (month: string | undefined) => void
    setTableLimit: (limit: number) => void
    setTransactionsByOffset: (offset: number, transactions: Transaction[]) => void
    getTransactionsByOffset: (offset: number) => Transaction[] | undefined
    setMemosTableLimit: (limit: number) => void
    setMemosByOffset: (offset: number, memos: Memo[]) => void
    getMemosByOffset: (offset: number) => Memo[] | undefined
    clearCache: () => void
}

export type Transaction = {
    id?: number;
    transaction_number?: string;
    date: string;
    description: string;
    memo: string;
    memo_id?: number;
    amount_debit: string;
    amount_credit: string;
    balance?: string;
    check_number?: string;
    fees?: string;
    budget_category?: string;
    created_at?: string;
    updated_at?: string;
};

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Memo {
    id: number;
    name: string
    recurring: boolean;
    necessary: boolean;
    frequency?: Frequency;
    budget_category?: string | null;
    ambiguous: boolean;
    total_amount_debit?: number;
    total_amount_credit?: number;
    total_transactions?: number;
    transactions_count?: number;
    avatar_s3_url?: string;
}

export interface BudgetCategory {
    name: string;
    necessary: boolean;
    recurring: boolean;
    frequency?: Frequency;
}


export enum Timeframe {
    Day = 'day',
    Month = 'month',
    Week = 'week',
    Year = 'year',
}


export interface TransactionQueryParams {
    date?: string;
    offset?: number;
    limit?: number;
    memo?: Memo['name'];
    timeFrame?: Timeframe;
    oldestDate?: boolean;
    count?: boolean;
    budgetCategory?: BudgetCategory['name'];
    historical?: boolean;
    totalAmountDebit?: boolean;
    budgetCategorySummary?: boolean;
    budgetCategoryHierarchySum?: boolean;
}

// app/javascript/types/formFields.ts
export interface FormField {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    minLength?: number;
    autoComplete?: string;
}