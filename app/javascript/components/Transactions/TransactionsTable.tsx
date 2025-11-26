import * as React from 'react';
import {useMemo} from 'react';
import {Box, CircularProgress, Link, Typography} from '@mui/material';
import {ColumnDefinition, DataTableWithQuery} from '../shared/DataTable';
import {useTransactions} from "~/hooks/useTransactions";
import {Transaction} from "~/types";
import {useNavigate} from "react-router-dom";
import TransactionsTableSelects from "~/components/Transactions/TransactionsTableSelects";
import {getTimeframeTypeAndValue} from "~/helpers/getTimeframeAndValue";

const TransactionsTable: React.FC = () => {
    const navigate = useNavigate()

    const {timeFrame, selectedValue} = getTimeframeTypeAndValue()
    const {data, isFetching, error} = useTransactions({timeFrame, selectedValue});

    // Flatten all pages into single array
    // only recompute when data changes, not on every render
    const transactions = useMemo(() => {
        return data?.pages.flat() ?? []
    }, [data])

    // Helper function to format currency values
    const formatCurrency = (value: string | null): string => {
        if (!value) return '-';
        const num = Number.parseFloat(value);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num);
    };

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    // Format memo as clickable link
    const formatMemo = (memo: any, row: Transaction) => {
        if (!memo?.name) return '-';

        return (
            <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                    e.preventDefault();
                    if (row.memo_id) {
                        navigate(`/memos/${row.memo_id}`);
                    }
                }}
                sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                        color: 'primary.dark'
                    }
                }}
            >
                {memo.name}
            </Link>
        );
    };

    // Define columns for the DataTable
    const columns: ColumnDefinition<Transaction>[] = [
        {
            prop: 'date',
            label: 'Date',
            formatter: formatDate
        },
        {
            prop: 'transaction_number',
            label: 'Transaction #'
        },
        {
            prop: 'description',
            label: 'Description',
            formatter: (value) => value || '-'
        },
        {
            prop: 'memo',
            label: 'Memo',
            formatter: formatMemo
        },
        {
            prop: 'budget_category',
            label: 'Category',
            formatter: (category) => category?.name || '-'
        },
        {
            prop: 'amount_debit',
            label: 'Debit',
            formatter: formatCurrency
        },
        {
            prop: 'amount_credit',
            label: 'Credit',
            formatter: formatCurrency
        },
        {
            prop: 'balance',
            label: 'Balance',
            formatter: formatCurrency
        }
    ];

    // Define sortable columns
    const sortableColumns = ['date', 'transaction_number', 'amount_debit', 'amount_credit', 'balance'];

    if (error) {
        return (
            <Box sx={{p: 3}}>
                <Typography color="error">
                    Error loading transactions: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom>
                Transactions
            </Typography>

            <TransactionsTableSelects dataTestId="transactions-table-selects"/>

            {isFetching && !data ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <DataTableWithQuery
                    data={transactions}
                    isFetching={isFetching}
                    columns={columns}
                    sortableColumns={sortableColumns}
                    rowKey="id"
                    dataTestId="transactions-table"
                />
            )}
        </Box>
    );
};

export default TransactionsTable;

