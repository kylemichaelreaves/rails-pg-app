// src/components/transactions/WeekSelect.tsx
import {useSearchParams} from 'react-router-dom'
import {useWeeks} from '~/hooks/useWeeks'
import SelectComponent from '@/components/shared/SelectComponent'
import AlertComponent from '@/components/shared/AlertComponent'
import {useMemo} from 'react'

interface WeekSelectProps {
    dataTestId?: string
}

export default function WeekSelect({
                                       dataTestId = 'transactions-table-week-select'
                                   }: Readonly<WeekSelectProps>) {
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedWeek = searchParams.get('week') || ''

    const {data, isLoading, isFetching, isError, error} = useWeeks()

    const weekOptions = useMemo(() => {
        if (!data) return []
        return data.map((item: { week_year: string }) => ({
            value: item.week_year,
            label: item.week_year
        }))
    }, [data])

    const updateSelectedWeek = (week: string) => {
        setSearchParams(prev => {
            prev.set('week', week)
            prev.set('timeFrame', 'week')
            return prev
        })
    }

    const clearSelectedWeek = () => {
        setSearchParams(prev => {
            prev.delete('week')
            return prev
        })
    }

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
                options={weekOptions}
                selectedValue={selectedWeek}
                placeholder="Select a week"
                disabled={isLoading || isFetching}
                onChange={updateSelectedWeek}
                onClear={clearSelectedWeek}
                dataTestId={dataTestId}
            />
        </div>
    )
}