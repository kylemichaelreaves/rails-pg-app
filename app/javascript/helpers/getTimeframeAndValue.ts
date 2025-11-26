// src/components/transactions/getTimeframeTypeAndValue.ts
import {useSearchParams} from 'react-router-dom'
import {Timeframe} from '@/types'

export function getTimeframeTypeAndValue() {
    const [searchParams] = useSearchParams()

    // Get timeFrame from URL params, default to 'day'
    const timeFrame = (searchParams.get('timeFrame') || 'day') as Timeframe

    // Get the selected value based on timeFrame
    let selectedValue: string | undefined

    switch (timeFrame) {
        case 'day':
            selectedValue = searchParams.get('day') || undefined
            break
        case 'week':
            selectedValue = searchParams.get('week') || undefined
            break
        case 'month':
            selectedValue = searchParams.get('month') || undefined
            break
        case 'year':
            selectedValue = searchParams.get('year') || undefined
            break
        default:
            selectedValue = undefined
    }

    return {
        timeFrame,
        selectedValue
    }
}