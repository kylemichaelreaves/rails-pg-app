import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import SummaryHeader from '../../../../app/javascript/components/shared/SummaryHeader'

describe('SummaryHeader', () => {
    const defaultProps = {
        timeFrame: 'Month' as const,
        selectedPeriod: '2025-11',
        isFirst: false,
        isLast: false,
        goToNext: vi.fn(),
        goToPrevious: vi.fn(),
        reset: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('should render with all required props', () => {
            render(<SummaryHeader {...defaultProps} />)

            expect(screen.getByTestId('month-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('month-summary-title')).toBeInTheDocument()
            expect(screen.getByTestId('month-summary-left-section')).toBeInTheDocument()
            expect(screen.getByTestId('month-summary-navigation-button-group')).toBeInTheDocument()
        })

        it('should render with Month timeFrame', () => {
            render(<SummaryHeader {...defaultProps} timeFrame="Month"/>)

            expect(screen.getByTestId('month-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for: 2025-11')
        })

        it('should render with Week timeFrame', () => {
            render(<SummaryHeader {...defaultProps} timeFrame="Week" selectedPeriod="2025-W47"/>)

            expect(screen.getByTestId('week-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('week-summary-title')).toHaveTextContent('Week Summary for: 2025-W47')
        })

        it('should display selected period in data attribute', () => {
            render(<SummaryHeader {...defaultProps} />)

            const header = screen.getByTestId('month-summary-header')
            expect(header).toHaveAttribute('data-selected-period', '2025-11')
        })

        it('should render title with correct format', () => {
            render(<SummaryHeader {...defaultProps} />)

            const title = screen.getByTestId('month-summary-title')
            expect(title).toHaveTextContent('Month Summary for: 2025-11')
        })

        it('should render subtitle when provided', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    subtitle={<span data-testid="custom-subtitle">Subtitle Text</span>}
                />
            )

            expect(screen.getByTestId('custom-subtitle')).toBeInTheDocument()
            expect(screen.getByTestId('custom-subtitle')).toHaveTextContent('Subtitle Text')
        })

        it('should not render subtitle when not provided', () => {
            render(<SummaryHeader {...defaultProps} />)

            expect(screen.queryByTestId('custom-subtitle')).not.toBeInTheDocument()
        })

        it('should render amountTotal when provided', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    amountTotal={<div data-testid="amount-total">$1,234.56</div>}
                />
            )

            expect(screen.getByTestId('amount-total')).toBeInTheDocument()
            expect(screen.getByTestId('amount-total')).toHaveTextContent('$1,234.56')
        })

        it('should not render amountTotal when not provided', () => {
            render(<SummaryHeader {...defaultProps} />)

            expect(screen.queryByTestId('amount-total')).not.toBeInTheDocument()
        })

        it('should render both subtitle and amountTotal when provided', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    subtitle={<span data-testid="custom-subtitle">Subtitle</span>}
                    amountTotal={<div data-testid="amount-total">$1,000.00</div>}
                />
            )

            expect(screen.getByTestId('custom-subtitle')).toBeInTheDocument()
            expect(screen.getByTestId('amount-total')).toBeInTheDocument()
        })
    })

    describe('NavigationButtonGroup Integration', () => {
        it('should render NavigationButtonGroup with correct props', () => {
            render(<SummaryHeader {...defaultProps} />)

            expect(screen.getByRole('button', {name: /previous month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset month/i})).toBeInTheDocument()
        })

        it('should pass correct label to NavigationButtonGroup for Month', () => {
            render(<SummaryHeader {...defaultProps} timeFrame="Month"/>)

            expect(screen.getByRole('button', {name: /previous month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset month/i})).toBeInTheDocument()
        })

        it('should pass correct label to NavigationButtonGroup for Week', () => {
            render(<SummaryHeader {...defaultProps} timeFrame="Week"/>)

            expect(screen.getByRole('button', {name: /previous week/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next week/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset week/i})).toBeInTheDocument()
        })

        it('should call goToNext when next button is clicked', () => {
            const goToNextMock = vi.fn()
            render(<SummaryHeader {...defaultProps} goToNext={goToNextMock}/>)

            fireEvent.click(screen.getByRole('button', {name: /next month/i}))

            expect(goToNextMock).toHaveBeenCalledTimes(1)
        })

        it('should call goToPrevious when previous button is clicked', () => {
            const goToPreviousMock = vi.fn()
            render(<SummaryHeader {...defaultProps} goToPrevious={goToPreviousMock}/>)

            fireEvent.click(screen.getByRole('button', {name: /previous month/i}))

            expect(goToPreviousMock).toHaveBeenCalledTimes(1)
        })

        it('should call reset when reset button is clicked', () => {
            const resetMock = vi.fn()
            render(<SummaryHeader {...defaultProps} reset={resetMock}/>)

            fireEvent.click(screen.getByRole('button', {name: /reset month/i}))

            expect(resetMock).toHaveBeenCalledTimes(1)
        })

        it('should disable next button when isFirst is true', () => {
            render(<SummaryHeader {...defaultProps} isFirst={true}/>)

            const nextButton = screen.getByRole('button', {name: /next month/i})
            expect(nextButton).toBeDisabled()
        })

        it('should disable previous button when isLast is true', () => {
            render(<SummaryHeader {...defaultProps} isLast={true}/>)

            const previousButton = screen.getByRole('button', {name: /previous month/i})
            expect(previousButton).toBeDisabled()
        })

        it('should disable both buttons when isFirst and isLast are true', () => {
            render(<SummaryHeader {...defaultProps} isFirst={true} isLast={true}/>)

            const nextButton = screen.getByRole('button', {name: /next month/i})
            const previousButton = screen.getByRole('button', {name: /previous month/i})

            expect(nextButton).toBeDisabled()
            expect(previousButton).toBeDisabled()
        })

        it('should enable both buttons when isFirst and isLast are false', () => {
            render(<SummaryHeader {...defaultProps} isFirst={false} isLast={false}/>)

            const nextButton = screen.getByRole('button', {name: /next month/i})
            const previousButton = screen.getByRole('button', {name: /previous month/i})

            expect(nextButton).not.toBeDisabled()
            expect(previousButton).not.toBeDisabled()
        })
    })

    describe('TimeFrame Variations', () => {
        it('should render Month summary with correct structure', () => {
            render(<SummaryHeader {...defaultProps} timeFrame="Month" selectedPeriod="2025-11"/>)

            expect(screen.getByTestId('month-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for: 2025-11')
            expect(screen.getByTestId('month-summary-left-section')).toBeInTheDocument()
        })

        it('should render Week summary with correct structure', () => {
            render(<SummaryHeader {...defaultProps} timeFrame="Week" selectedPeriod="2025-W47"/>)

            expect(screen.getByTestId('week-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('week-summary-title')).toHaveTextContent('Week Summary for: 2025-W47')
            expect(screen.getByTestId('week-summary-left-section')).toBeInTheDocument()
        })

        it('should use lowercase timeFrame for testId prefix', () => {
            const {rerender} = render(<SummaryHeader {...defaultProps} timeFrame="Month"/>)

            expect(screen.getByTestId('month-summary-header')).toBeInTheDocument()

            rerender(<SummaryHeader {...defaultProps} timeFrame="Week"/>)

            expect(screen.getByTestId('week-summary-header')).toBeInTheDocument()
            expect(screen.queryByTestId('month-summary-header')).not.toBeInTheDocument()
        })
    })

    describe('Selected Period Display', () => {
        it('should display different month formats', () => {
            const {rerender} = render(
                <SummaryHeader {...defaultProps} selectedPeriod="2025-01"/>
            )

            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for: 2025-01')

            rerender(<SummaryHeader {...defaultProps} selectedPeriod="2025-12"/>)

            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for: 2025-12')
        })

        it('should display different week formats', () => {
            const {rerender} = render(
                <SummaryHeader {...defaultProps} timeFrame="Week" selectedPeriod="2025-W01"/>
            )

            expect(screen.getByTestId('week-summary-title')).toHaveTextContent('Week Summary for: 2025-W01')

            rerender(<SummaryHeader {...defaultProps} timeFrame="Week" selectedPeriod="2025-W52"/>)

            expect(screen.getByTestId('week-summary-title')).toHaveTextContent('Week Summary for: 2025-W52')
        })

        it('should update data-selected-period attribute', () => {
            const {rerender} = render(
                <SummaryHeader {...defaultProps} selectedPeriod="2025-01"/>
            )

            let header = screen.getByTestId('month-summary-header')
            expect(header).toHaveAttribute('data-selected-period', '2025-01')

            rerender(<SummaryHeader {...defaultProps} selectedPeriod="2025-02"/>)

            header = screen.getByTestId('month-summary-header')
            expect(header).toHaveAttribute('data-selected-period', '2025-02')
        })
    })

    describe('Layout and Structure', () => {
        it('should have proper container structure', () => {
            render(<SummaryHeader {...defaultProps} />)

            const header = screen.getByTestId('month-summary-header')
            const leftSection = screen.getByTestId('month-summary-left-section')
            const navigationGroup = screen.getByTestId('month-summary-navigation-button-group')

            expect(header).toContainElement(leftSection)
            expect(header).toContainElement(navigationGroup)
        })

        it('should render title inside left section', () => {
            render(<SummaryHeader {...defaultProps} />)

            const leftSection = screen.getByTestId('month-summary-left-section')
            const title = screen.getByTestId('month-summary-title')

            expect(leftSection).toContainElement(title)
        })

        it('should render subtitle inside left section when provided', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    subtitle={<span data-testid="custom-subtitle">Subtitle</span>}
                />
            )

            const leftSection = screen.getByTestId('month-summary-left-section')
            const subtitle = screen.getByTestId('custom-subtitle')

            expect(leftSection).toContainElement(subtitle)
        })

        it('should render amountTotal inside left section when provided', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    amountTotal={<div data-testid="amount-total">$1,000.00</div>}
                />
            )

            const leftSection = screen.getByTestId('month-summary-left-section')
            const amountTotal = screen.getByTestId('amount-total')

            expect(leftSection).toContainElement(amountTotal)
        })
    })

    describe('Edge Cases', () => {
        it('should handle empty selectedPeriod', () => {
            render(<SummaryHeader {...defaultProps} selectedPeriod=""/>)

            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for:')
        })

        it('should handle special characters in selectedPeriod', () => {
            render(<SummaryHeader {...defaultProps} selectedPeriod="2025-11 (Special!)"/>)

            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for: 2025-11 (Special!)')
        })

        it('should handle complex subtitle ReactNode', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    subtitle={
                        <div data-testid="complex-subtitle">
                            <span>Line 1</span>
                            <span>Line 2</span>
                        </div>
                    }
                />
            )

            const subtitle = screen.getByTestId('complex-subtitle')
            expect(subtitle).toBeInTheDocument()
            expect(subtitle).toHaveTextContent('Line 1Line 2')
        })

        it('should handle complex amountTotal ReactNode', () => {
            render(
                <SummaryHeader
                    {...defaultProps}
                    amountTotal={
                        <div data-testid="complex-amount">
                            <strong>Total:</strong> $1,234.56
                        </div>
                    }
                />
            )

            const amountTotal = screen.getByTestId('complex-amount')
            expect(amountTotal).toBeInTheDocument()
            expect(amountTotal).toHaveTextContent('Total: $1,234.56')
        })
    })

    describe('Integration Scenarios', () => {
        it('should handle complete Month navigation flow', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()
            const resetMock = vi.fn()

            render(
                <SummaryHeader
                    timeFrame="Month"
                    selectedPeriod="2025-11"
                    isFirst={false}
                    isLast={false}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    reset={resetMock}
                />
            )

            // Navigate previous
            fireEvent.click(screen.getByRole('button', {name: /previous month/i}))
            expect(goToPreviousMock).toHaveBeenCalledTimes(1)

            // Navigate next
            fireEvent.click(screen.getByRole('button', {name: /next month/i}))
            expect(goToNextMock).toHaveBeenCalledTimes(1)

            // Reset
            fireEvent.click(screen.getByRole('button', {name: /reset month/i}))
            expect(resetMock).toHaveBeenCalledTimes(1)
        })

        it('should handle complete Week navigation flow', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()
            const resetMock = vi.fn()

            render(
                <SummaryHeader
                    timeFrame="Week"
                    selectedPeriod="2025-W47"
                    isFirst={false}
                    isLast={false}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    reset={resetMock}
                />
            )

            // Navigate previous
            fireEvent.click(screen.getByRole('button', {name: /previous week/i}))
            expect(goToPreviousMock).toHaveBeenCalledTimes(1)

            // Navigate next
            fireEvent.click(screen.getByRole('button', {name: /next week/i}))
            expect(goToNextMock).toHaveBeenCalledTimes(1)

            // Reset
            fireEvent.click(screen.getByRole('button', {name: /reset week/i}))
            expect(resetMock).toHaveBeenCalledTimes(1)
        })

        it('should handle navigation at boundaries', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()

            const {rerender} = render(
                <SummaryHeader
                    {...defaultProps}
                    isFirst={true}
                    isLast={false}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                />
            )

            // At first item - next button disabled
            let nextButton = screen.getByRole('button', {name: /next month/i})
            expect(nextButton).toBeDisabled()
            fireEvent.click(nextButton)
            expect(goToNextMock).not.toHaveBeenCalled()

            // Move to last item - previous button disabled
            rerender(
                <SummaryHeader
                    {...defaultProps}
                    isFirst={false}
                    isLast={true}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                />
            )

            const previousButton = screen.getByRole('button', {name: /previous month/i})
            expect(previousButton).toBeDisabled()
            fireEvent.click(previousButton)
            expect(goToPreviousMock).not.toHaveBeenCalled()
        })

        it('should render full Month summary with all optional props', () => {
            render(
                <SummaryHeader
                    timeFrame="Month"
                    selectedPeriod="2025-11"
                    isFirst={false}
                    isLast={false}
                    goToNext={vi.fn()}
                    goToPrevious={vi.fn()}
                    reset={vi.fn()}
                    subtitle={<span data-testid="subtitle">November 2025</span>}
                    amountTotal={<div data-testid="amount">Total: $5,432.10</div>}
                />
            )

            expect(screen.getByTestId('month-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('month-summary-title')).toHaveTextContent('Month Summary for: 2025-11')
            expect(screen.getByTestId('subtitle')).toHaveTextContent('November 2025')
            expect(screen.getByTestId('amount')).toHaveTextContent('Total: $5,432.10')
            expect(screen.getByRole('button', {name: /previous month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset month/i})).toBeInTheDocument()
        })

        it('should render full Week summary with all optional props', () => {
            render(
                <SummaryHeader
                    timeFrame="Week"
                    selectedPeriod="2025-W47"
                    isFirst={false}
                    isLast={false}
                    goToNext={vi.fn()}
                    goToPrevious={vi.fn()}
                    reset={vi.fn()}
                    subtitle={<span data-testid="subtitle">Nov 17-23, 2025</span>}
                    amountTotal={<div data-testid="amount">Total: $1,234.56</div>}
                />
            )

            expect(screen.getByTestId('week-summary-header')).toBeInTheDocument()
            expect(screen.getByTestId('week-summary-title')).toHaveTextContent('Week Summary for: 2025-W47')
            expect(screen.getByTestId('subtitle')).toHaveTextContent('Nov 17-23, 2025')
            expect(screen.getByTestId('amount')).toHaveTextContent('Total: $1,234.56')
            expect(screen.getByRole('button', {name: /previous week/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next week/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset week/i})).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('should use semantic heading for title', () => {
            render(<SummaryHeader {...defaultProps} />)

            const title = screen.getByTestId('month-summary-title')
            expect(title.tagName).toBe('H2')
        })

        it('should have proper heading level', () => {
            render(<SummaryHeader {...defaultProps} />)

            const heading = screen.getByRole('heading', {level: 2})
            expect(heading).toHaveTextContent('Month Summary for: 2025-11')
        })

        it('should maintain button accessibility through NavigationButtonGroup', () => {
            render(<SummaryHeader {...defaultProps} />)

            const buttons = screen.getAllByRole('button')
            expect(buttons).toHaveLength(3)

            buttons.forEach(button => {
                expect(button).toHaveAccessibleName()
            })
        })
    })
})

