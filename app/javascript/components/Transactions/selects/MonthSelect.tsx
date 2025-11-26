// src/components/transactions/MonthSelect.tsx
import {useSearchParams, useNavigate} from 'react-router-dom'
import {useMonths} from '~/hooks/useMonths'
import {useTransactionsContext} from '@/contexts/TransactionsContext'
import SelectComponent from '@/components/shared/SelectComponent'
import AlertComponent from '@/components/shared/AlertComponent'
import {useMemo, useEffect} from 'react'

interface MonthSelectProps {
    dataTestId?: string
}

export default function MonthSelect({
                                        dataTestId = 'transactions-table-month-select'
                                    }: Readonly<MonthSelectProps>) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const {setTableLimit} = useTransactionsContext()

    const selectedMonth = searchParams.get('month') || ''

    const {data, isLoading, isFetching, isError, error} = useMonths()

    const monthOptions = useMemo(() => {
        if (!data) return []
        return data.map(item => ({
            value: item.month_year,
            label: item.month_year
        }))
    }, [data])

    const updateSelectedMonth = (month: string) => {
        setTableLimit(200)
        navigate(`/transactions/months/${month}/summary`)
    }

    const clearSelectedMonth = () => {
        setTableLimit(100)
        navigate('/transactions')
    }

    // Reset table limit on unmount
    useEffect(() => {
        return () => {
            setTableLimit(100)
        }
    }, [setTableLimit])

    return (
        <div data-testid={dataTestId}>
            {isError && error && (
                <AlertComponent
                    type="error"
                    title={error.name || 'Error'}
                    message={error.message}
                    dataTestId={`${dataTestId}-error`}
                />
            )}
            <SelectComponent
                options={monthOptions}
                selectedValue={selectedMonth}
                placeholder="Select a month"
                disabled={isLoading || isFetching}
                onChange={updateSelectedMonth}
                onClear={clearSelectedMonth}
                dataTestId={dataTestId}
            />
        </div>
    )
}