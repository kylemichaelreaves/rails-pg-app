// src/components/transactions/DaySelect.tsx
import {useNavigate, useSearchParams} from 'react-router-dom'
import SelectComponent from '@/components/shared/SelectComponent'
import AlertComponent from '@/components/shared/AlertComponent'
import {useMemo} from 'react'
import {useDays} from "~/hooks/useDays";

interface DaySelectProps {
    dataTestId?: string
}

export default function DaySelect({
                                      dataTestId = 'transactions-table-day-select'
                                  }: Readonly<DaySelectProps>) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const selectedDay = searchParams.get('day') || ''

    const {data, isLoading, isFetching, isError, error} = useDays()

    const dayOptions = useMemo(() => {
        if (!data) return []
        return data.map((item: { day: string }) => ({
            value: item.day,
            label: item.day
        }))
    }, [data])

    const updateSelectedDay = (day: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('day', day)
        params.set('timeFrame', 'day')
        navigate(`/transactions?${params.toString()}`)
    }

    const clearSelectedDay = () => {
        navigate('/transactions')
    }

    return (
        <div>
            {isError && error && (
                <AlertComponent
                    type="error"
                    title={error.name || 'Error'}
                    message={error.message}
                    dataTestId={`${dataTestId}-error`}
                />
            )}
            <SelectComponent
                options={dayOptions}
                selectedValue={selectedDay}
                placeholder="Select a day"
                disabled={isLoading || isFetching}
                onChange={updateSelectedDay}
                onClear={clearSelectedDay}
                loading={isLoading || isFetching}
                loadingText="Loading days..."
                dataTestId={dataTestId}
            />
        </div>
    )
}