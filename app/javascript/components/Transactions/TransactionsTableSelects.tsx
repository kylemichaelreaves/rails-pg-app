// src/components/transactions/TransactionsTableSelects.tsx
import {Grid} from '@mui/material'

import WeekSelect from '~/components/Transactions/selects/WeekSelect'
import MonthSelect from '~/components/Transactions/selects/MonthSelect'
import MemoSelect from '~/components/Transactions/selects/MemoSelect'
import {ComponentType} from 'react'
import DaySelect from "~/components/Transactions/selects/DaySelect";


interface SelectConfig {
    Component: ComponentType<{ dataTestId?: string }>
    size: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number } | number | 'grow'
    dataTestId: string
}

interface TransactionsTableSelectsProps {
    dataTestId?: string
}

const SELECT_CONFIGS: SelectConfig[] = [
    {
        Component: DaySelect,
        size: {xs: 12, sm: 6, md: 2},
        dataTestId: 'transactions-table-day-select'
    },
    {
        Component: WeekSelect,
        size: {xs: 12, sm: 6, md: 2},
        dataTestId: 'transactions-table-week-select'
    },
    {
        Component: MonthSelect,
        size: {xs: 12, sm: 6, md: 2},
        dataTestId: 'transactions-table-month-select'
    },
    {
        Component: MemoSelect,
        size: {xs: 12, md: 4},
        dataTestId: 'transactions-table-memo-select'
    }
]

export default function TransactionsTableSelects({
                                                     dataTestId = 'transactions-table-selects-row'
                                                 }: Readonly<TransactionsTableSelectsProps>) {
    return (
        <Grid
            container
            spacing={2}
            sx={{mb: 2}}
            data-testid={dataTestId}
        >
            {SELECT_CONFIGS.map(({Component, size, dataTestId: selectTestId}) => (
                <Grid
                    key={selectTestId}
                    size={size}
                >
                    <Component dataTestId={selectTestId}/>
                </Grid>
            ))}
        </Grid>
    )
}