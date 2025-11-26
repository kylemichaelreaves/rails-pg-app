// src/components/transactions/MemoSelect.tsx
import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSearchMemos} from '~/hooks/useSearchMemos'
import {useTransactionsContext} from '@/contexts/TransactionsContext'
import SelectComponent from '@/components/shared/SelectComponent'
import type {Memo} from '@/types'

interface MemoSelectProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    dataTestId?: string
}

export default function MemoSelect({
                                       value = '',
                                       onChange,
                                       placeholder = 'Search memos...',
                                       dataTestId = 'transactions-table-memo-select'
                                   }: Readonly<MemoSelectProps>) {

    const navigate = useNavigate()
    const {setSelectedMemo} = useTransactionsContext()
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    // Debounce search term to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300) // 300ms debounce

        return () => clearTimeout(timer)
    }, [searchTerm])

    const {data: searchResults, isLoading, isFetching} = useSearchMemos({
        searchTerm: debouncedSearchTerm,
        enabled: debouncedSearchTerm.length > 0,
        limit: 50,
    })

    // Convert memos to select options
    const memoOptions = useMemo(() => {
        if (!searchResults || searchResults.length === 0) return []

        return searchResults.map((memo: Memo) => ({
            value: memo.name,
            label: memo.name
        }))
    }, [searchResults])

    const handleChange = (selectedMemo: string) => {
        setSelectedMemo(selectedMemo)
        onChange?.(selectedMemo)
    }

    const handleClear = () => {
        setSelectedMemo('')
        setSearchTerm('')
        setDebouncedSearchTerm('')
        onChange?.('')
        navigate('/memos')
    }

    const handleSearchInput = (inputValue: string) => {
        setSearchTerm(inputValue)
    }

    return (
        <div>
            <SelectComponent
                options={memoOptions}
                selectedValue={value}
                placeholder={placeholder}
                disabled={false}
                onChange={handleChange}
                onClear={handleClear}
                onInputChange={handleSearchInput}
                loading={isLoading || isFetching}
                loadingText="Searching memos..."
                dataTestId={dataTestId}
            />
        </div>
    )
}