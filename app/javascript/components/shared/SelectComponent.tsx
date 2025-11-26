import React from 'react';
import {Autocomplete, TextField, CircularProgress} from '@mui/material';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    selectedValue?: string;
    placeholder: string;
    disabled?: boolean;
    onChange: (selectedValue: string) => void;
    onClear?: () => void;
    onInputChange?: (searchTerm: string) => void;
    loading?: boolean;
    loadingText?: string;
    dataTestId?: string;
}

export default function SelectComponent({
                                            options,
                                            selectedValue = '',
                                            placeholder,
                                            disabled = false,
                                            onChange,
                                            onClear,
                                            onInputChange,
                                            loading = false,
                                            loadingText = 'Loading...',
                                            dataTestId = '',
                                        }: Readonly<SelectProps>) {
    const selectedOption = options.find(opt => opt.value === selectedValue) || null;

    const handleChange = (_event: React.SyntheticEvent, value: SelectOption | null) => {
        if (value === null) {
            onClear?.();
        } else {
            onChange(value.value);
        }
    };

    const handleSearchInput = (_event: React.SyntheticEvent, value: string) => {
        onInputChange?.(value);
    };

    return (
        <Autocomplete
            value={selectedOption}
            onChange={handleChange}
            onInputChange={handleSearchInput}
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            disabled={disabled}
            loading={loading}
            loadingText={loadingText}
            data-testid={dataTestId}
            slotProps={{
                paper: {
                    sx: {
                        '& .MuiAutocomplete-listbox': {
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                },
                            },
                        },
                    },
                },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        },
                    }}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} data-testid={`option-${option.value}`}>
                    {option.label}
                </li>
            )}
        />
    );
}