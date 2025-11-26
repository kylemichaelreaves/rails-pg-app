import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, screen, fireEvent, waitFor, within} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import SelectComponent, {SelectProps, SelectOption} from '../../../../app/javascript/components/shared/SelectComponent'

describe('SelectComponent', () => {
    const mockOptions: SelectOption[] = [
        {value: '1', label: 'Option 1'},
        {value: '2', label: 'Option 2'},
        {value: '3', label: 'Option 3'},
        {value: 'special-chars', label: 'Option with Special!@#'},
    ]

    const defaultProps: SelectProps = {
        options: mockOptions,
        placeholder: 'Select an option',
        onChange: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('should render with required props', () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            expect(input).toBeInTheDocument()
            expect(input).toHaveAttribute('placeholder', 'Select an option')
        })

        it('should render with custom dataTestId', () => {
            render(<SelectComponent {...defaultProps} dataTestId="custom-select"/>)

            expect(screen.getByTestId('custom-select')).toBeInTheDocument()
        })

        it('should render all options when opened', async () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-1')).toBeInTheDocument()
                expect(screen.getByTestId('option-2')).toBeInTheDocument()
                expect(screen.getByTestId('option-3')).toBeInTheDocument()
                expect(screen.getByTestId('option-special-chars')).toBeInTheDocument()
            })
        })

        it('should display selected value', () => {
            render(<SelectComponent {...defaultProps} selectedValue="2"/>)

            const input = screen.getByRole('combobox')
            expect(input).toHaveValue('Option 2')
        })

        it('should render with empty selected value', () => {
            render(<SelectComponent {...defaultProps} selectedValue=""/>)

            const input = screen.getByRole('combobox')
            expect(input).toHaveValue('')
        })

        it('should render with undefined selected value', () => {
            render(<SelectComponent {...defaultProps} selectedValue={undefined}/>)

            const input = screen.getByRole('combobox')
            expect(input).toHaveValue('')
        })
    })

    describe('User Interactions', () => {
        it('should call onChange when an option is selected', async () => {
            const onChangeMock = vi.fn()
            render(<SelectComponent {...defaultProps} onChange={onChangeMock}/>)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-2')).toBeInTheDocument()
            })

            fireEvent.click(screen.getByTestId('option-2'))

            expect(onChangeMock).toHaveBeenCalledTimes(1)
            expect(onChangeMock).toHaveBeenCalledWith('2')
        })

        it('should call onClear when selection is cleared', async () => {
            const onClearMock = vi.fn()
            render(
                <SelectComponent
                    {...defaultProps}
                    selectedValue="1"
                    onClear={onClearMock}
                />
            )

            const clearButton = screen.getByTitle('Clear')
            fireEvent.click(clearButton)

            expect(onClearMock).toHaveBeenCalledTimes(1)
        })

        it('should not throw error when onClear is not provided', async () => {
            render(<SelectComponent {...defaultProps} selectedValue="1"/>)

            const clearButton = screen.getByTitle('Clear')
            expect(() => fireEvent.click(clearButton)).not.toThrow()
        })

        it('should call onInputChange when user types', async () => {
            const onInputChangeMock = vi.fn()
            render(
                <SelectComponent
                    {...defaultProps}
                    onInputChange={onInputChangeMock}
                />
            )

            const input = screen.getByRole('combobox')
            fireEvent.change(input, {target: {value: 'test'}})

            await waitFor(() => {
                expect(onInputChangeMock).toHaveBeenCalled()
            })
        })

        it('should not throw error when onInputChange is not provided', () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            expect(() => fireEvent.change(input, {target: {value: 'test'}})).not.toThrow()
        })


        it('should filter options when typing', async () => {
            const user = userEvent.setup()
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')

            // Click to focus and open dropdown
            await user.click(input)

            // Type to filter
            await user.type(input, 'Option 2')

            await waitFor(() => {
                const listbox = screen.getByRole('listbox')
                expect(within(listbox).getByText('Option 2')).toBeInTheDocument()
            })
        })
    })

    describe('Disabled State', () => {
        it('should be disabled when disabled prop is true', () => {
            render(<SelectComponent {...defaultProps} disabled={true}/>)

            const input = screen.getByRole('combobox')
            expect(input).toBeDisabled()
        })

        it('should not be disabled by default', () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            expect(input).not.toBeDisabled()
        })

        it('should not open dropdown when disabled', () => {
            render(<SelectComponent {...defaultProps} disabled={true}/>)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })
    })

    describe('Loading State', () => {
        it('should show loading indicator when loading is true', () => {
            render(<SelectComponent {...defaultProps} loading={true}/>)

            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })

        it('should not show loading indicator by default', () => {
            render(<SelectComponent {...defaultProps} />)

            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        it('should display custom loading text', async () => {
            render(
                <SelectComponent
                    {...defaultProps}
                    options={[]} // empty options to show loading text
                    loading={true}
                    loadingText="Fetching data..."
                />
            )

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByText('Fetching data...')).toBeInTheDocument()
            })
        })

        it('should display default loading text', async () => {
            render(
                <SelectComponent
                    {...defaultProps}
                    options={[]} // empty options to show loading text
                    loading={true}
                />
            )

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByText('Loading...')).toBeInTheDocument()
            })
        })
    })

    describe('Options Handling', () => {
        it('should handle empty options array', () => {
            render(<SelectComponent {...defaultProps} options={[]}/>)

            const input = screen.getByRole('combobox')
            expect(input).toBeInTheDocument()
        })

        it('should handle options with special characters', async () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-special-chars')).toBeInTheDocument()
                expect(screen.getByText('Option with Special!@#')).toBeInTheDocument()
            })
        })

        it('should handle single option', async () => {
            const singleOption: SelectOption[] = [{value: 'single', label: 'Single Option'}]
            render(<SelectComponent {...defaultProps} options={singleOption}/>)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-single')).toBeInTheDocument()
            })
        })

        it('should handle many options', async () => {
            const manyOptions: SelectOption[] = Array.from({length: 50}, (_, i) => ({
                value: `${i}`,
                label: `Option ${i}`,
            }))

            render(<SelectComponent {...defaultProps} options={manyOptions}/>)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-0')).toBeInTheDocument()
                expect(screen.getByTestId('option-10')).toBeInTheDocument()
            })
        })
    })

    describe('Edge Cases', () => {
        it('should handle selectedValue that does not exist in options', () => {
            render(<SelectComponent {...defaultProps} selectedValue="non-existent"/>)

            const input = screen.getByRole('combobox')
            expect(input).toHaveValue('')
        })

        it('should handle changing selectedValue prop', () => {
            const {rerender} = render(
                <SelectComponent {...defaultProps} selectedValue="1"/>
            )

            let input = screen.getByRole('combobox')
            expect(input).toHaveValue('Option 1')

            rerender(<SelectComponent {...defaultProps} selectedValue="2"/>)

            input = screen.getByRole('combobox')
            expect(input).toHaveValue('Option 2')
        })

        it('should handle changing options prop', async () => {
            const user = userEvent.setup()
            const {rerender} = render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')

            // Open first dropdown
            await user.click(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-1')).toBeInTheDocument()
            })

            // Close dropdown
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            })

            const newOptions: SelectOption[] = [
                {value: 'a', label: 'Option A'},
                {value: 'b', label: 'Option B'},
            ]

            rerender(<SelectComponent {...defaultProps} options={newOptions}/>)

            // Reopen dropdown
            await user.click(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-a')).toBeInTheDocument()
                expect(screen.queryByTestId('option-1')).not.toBeInTheDocument()
            })
        })

        it('should handle placeholder change', () => {
            const {rerender} = render(<SelectComponent {...defaultProps} />)

            let input = screen.getByRole('combobox')
            expect(input).toHaveAttribute('placeholder', 'Select an option')

            rerender(<SelectComponent {...defaultProps} placeholder="Choose one"/>)

            input = screen.getByRole('combobox')
            expect(input).toHaveAttribute('placeholder', 'Choose one')
        })
    })

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            expect(input).toHaveAttribute('aria-expanded', 'false')
            expect(input).toHaveAttribute('aria-autocomplete', 'list')
        })

        it('should expand ARIA when opened', async () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(input).toHaveAttribute('aria-expanded', 'true')
            })
        })

        it('should have listbox role for options', async () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument()
            })
        })

        it('should have option role for each option', async () => {
            render(<SelectComponent {...defaultProps} />)

            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                const options = screen.getAllByRole('option')
                expect(options).toHaveLength(4)
            })
        })
    })

    describe('Integration Scenarios', () => {
        it('should handle complete selection flow', async () => {
            const onChangeMock = vi.fn()
            const onInputChangeMock = vi.fn()

            render(
                <SelectComponent
                    {...defaultProps}
                    onChange={onChangeMock}
                    onInputChange={onInputChangeMock}
                    dataTestId="integration-select"
                />
            )

            // Open dropdown
            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            // Wait for options to appear
            await waitFor(() => {
                expect(screen.getByTestId('option-2')).toBeInTheDocument()
            })

            // Select an option
            fireEvent.click(screen.getByTestId('option-2'))

            // Verify onChange was called
            expect(onChangeMock).toHaveBeenCalledWith('2')
        })


        it('should handle search and select flow', async () => {
            const user = userEvent.setup()
            const onChangeMock = vi.fn()
            const onInputChangeMock = vi.fn()

            render(
                <SelectComponent
                    {...defaultProps}
                    onChange={onChangeMock}
                    onInputChange={onInputChangeMock}
                />
            )

            const input = screen.getByRole('combobox')

            // Click to focus and open dropdown
            await user.click(input)

            // Type in the input - this will filter options
            await user.type(input, 'Option 3')

            // Wait for filtered option to be visible
            await waitFor(() => {
                expect(screen.getByTestId('option-3')).toBeInTheDocument()
            })

            // Verify onInputChange was called for each character typed
            expect(onInputChangeMock).toHaveBeenCalled()

            // Click the option to select it
            await user.click(screen.getByTestId('option-3'))

            // Verify onChange was called with the selected value
            expect(onChangeMock).toHaveBeenCalledWith('3')
        })

        it('should handle select and clear flow', async () => {
            const onChangeMock = vi.fn()
            const onClearMock = vi.fn()

            const {rerender} = render(
                <SelectComponent
                    {...defaultProps}
                    onChange={onChangeMock}
                    onClear={onClearMock}
                    selectedValue=""
                />
            )

            // Select an option
            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByTestId('option-1')).toBeInTheDocument()
            })

            fireEvent.click(screen.getByTestId('option-1'))

            expect(onChangeMock).toHaveBeenCalledWith('1')

            // Rerender with selected value
            rerender(
                <SelectComponent
                    {...defaultProps}
                    onChange={onChangeMock}
                    onClear={onClearMock}
                    selectedValue="1"
                />
            )

            // Clear the selection
            const clearButton = screen.getByTitle('Clear')
            fireEvent.click(clearButton)

            expect(onClearMock).toHaveBeenCalledTimes(1)
        })

        it('should handle loading state while selecting', async () => {
            const onChangeMock = vi.fn()

            const {rerender} = render(
                <SelectComponent
                    {...defaultProps}
                    onChange={onChangeMock}
                    loading={false}
                />
            )

            // Start with no loading
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

            // Enable loading with empty options to see loading text
            rerender(
                <SelectComponent
                    {...defaultProps}
                    options={[]} // Empty options to show loading text
                    onChange={onChangeMock}
                    loading={true}
                />
            )

            // Loading indicator should appear
            expect(screen.getByRole('progressbar')).toBeInTheDocument()

            // Open dropdown to see loading text
            const input = screen.getByRole('combobox')
            fireEvent.mouseDown(input)

            await waitFor(() => {
                expect(screen.getByText('Loading...')).toBeInTheDocument()
            })
        })

        it('should handle disabled state preventing interactions', async () => {
            const onChangeMock = vi.fn()

            render(
                <SelectComponent
                    {...defaultProps}
                    onChange={onChangeMock}
                    disabled={true}
                />
            )

            const input = screen.getByRole('combobox')

            // Verify input is disabled
            expect(input).toBeDisabled()

            // Try to open dropdown
            fireEvent.mouseDown(input)

            // Dropdown should not open
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

            // Try to click on the input
            fireEvent.click(input)

            // Dropdown still should not open
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

            // onChange should never be called since no selection can be made
            expect(onChangeMock).not.toHaveBeenCalled()
        })
    })
})

