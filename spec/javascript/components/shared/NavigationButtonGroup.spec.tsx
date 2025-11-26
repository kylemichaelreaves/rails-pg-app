import {describe, it, expect, vi, beforeEach} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import NavigationButtonGroup from '../../../../app/javascript/components/shared/NavigationButtonGroup'

describe('NavigationButtonGroup', () => {
    const defaultProps = {
        goToPrevious: vi.fn(),
        goToNext: vi.fn(),
        isFirst: false,
        isLast: false,
        label: 'Item',
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('should render with all required props', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            expect(screen.getByRole('button', {name: /previous item/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next item/i})).toBeInTheDocument()
        })

        it('should render with custom dataTestId', () => {
            render(<NavigationButtonGroup {...defaultProps} data-testid="custom-navigation"/>)

            expect(screen.getByTestId('custom-navigation')).toBeInTheDocument()
        })

        it('should render with custom label', () => {
            render(<NavigationButtonGroup {...defaultProps} label="Month"/>)

            expect(screen.getByRole('button', {name: /previous month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next month/i})).toBeInTheDocument()
        })

        it('should render previous button with ArrowBackIcon', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            const icon = prevButton.querySelector('svg')
            expect(icon).toBeInTheDocument()
        })

        it('should render next button with ArrowForwardIcon', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            const icon = nextButton.querySelector('svg')
            expect(icon).toBeInTheDocument()
        })

        it('should not render reset button when reset prop is not provided', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            expect(screen.queryByRole('button', {name: /reset item/i})).not.toBeInTheDocument()
        })

        it('should render reset button when reset prop is provided', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} reset={resetMock}/>)

            expect(screen.getByRole('button', {name: /reset item/i})).toBeInTheDocument()
        })

        it('should render reset button with CloseIcon', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} reset={resetMock}/>)

            const resetButton = screen.getByRole('button', {name: /reset item/i})
            const icon = resetButton.querySelector('svg')
            expect(icon).toBeInTheDocument()
        })
    })

    describe('Button Interactions', () => {
        it('should call goToPrevious when previous button is clicked', () => {
            const goToPreviousMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} goToPrevious={goToPreviousMock}/>)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            fireEvent.click(prevButton)

            expect(goToPreviousMock).toHaveBeenCalledTimes(1)
        })

        it('should call goToNext when next button is clicked', () => {
            const goToNextMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} goToNext={goToNextMock}/>)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            fireEvent.click(nextButton)

            expect(goToNextMock).toHaveBeenCalledTimes(1)
        })

        it('should call reset when reset button is clicked', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} reset={resetMock}/>)

            const resetButton = screen.getByRole('button', {name: /reset item/i})
            fireEvent.click(resetButton)

            expect(resetMock).toHaveBeenCalledTimes(1)
        })

        it('should pass event to goToPrevious handler', () => {
            const goToPreviousMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} goToPrevious={goToPreviousMock}/>)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            fireEvent.click(prevButton)

            expect(goToPreviousMock).toHaveBeenCalledWith(expect.any(Object))
            expect(goToPreviousMock.mock.calls[0][0]).toHaveProperty('type', 'click')
        })

        it('should pass event to goToNext handler', () => {
            const goToNextMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} goToNext={goToNextMock}/>)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            fireEvent.click(nextButton)

            expect(goToNextMock).toHaveBeenCalledWith(expect.any(Object))
            expect(goToNextMock.mock.calls[0][0]).toHaveProperty('type', 'click')
        })

        it('should pass event to reset handler', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} reset={resetMock}/>)

            const resetButton = screen.getByRole('button', {name: /reset item/i})
            fireEvent.click(resetButton)

            expect(resetMock).toHaveBeenCalledWith(expect.any(Object))
            expect(resetMock.mock.calls[0][0]).toHaveProperty('type', 'click')
        })
    })

    describe('Disabled States', () => {
        it('should disable previous button when isLast is true', () => {
            render(<NavigationButtonGroup {...defaultProps} isLast={true}/>)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            expect(prevButton).toBeDisabled()
        })

        it('should disable next button when isFirst is true', () => {
            render(<NavigationButtonGroup {...defaultProps} isFirst={true}/>)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            expect(nextButton).toBeDisabled()
        })

        it('should not disable previous button when isLast is false', () => {
            render(<NavigationButtonGroup {...defaultProps} isLast={false}/>)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            expect(prevButton).not.toBeDisabled()
        })

        it('should not disable next button when isFirst is false', () => {
            render(<NavigationButtonGroup {...defaultProps} isFirst={false}/>)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            expect(nextButton).not.toBeDisabled()
        })

        it('should not call goToPrevious when previous button is disabled', () => {
            const goToPreviousMock = vi.fn()
            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToPrevious={goToPreviousMock}
                    isLast={true}
                />
            )

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            fireEvent.click(prevButton)

            expect(goToPreviousMock).not.toHaveBeenCalled()
        })

        it('should not call goToNext when next button is disabled', () => {
            const goToNextMock = vi.fn()
            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToNext={goToNextMock}
                    isFirst={true}
                />
            )

            const nextButton = screen.getByRole('button', {name: /next item/i})
            fireEvent.click(nextButton)

            expect(goToNextMock).not.toHaveBeenCalled()
        })

        it('should never disable reset button', () => {
            const resetMock = vi.fn()
            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    reset={resetMock}
                    isFirst={true}
                    isLast={true}
                />
            )

            const resetButton = screen.getByRole('button', {name: /reset item/i})
            expect(resetButton).not.toBeDisabled()
        })

        it('should disable both navigation buttons at boundaries', () => {
            render(<NavigationButtonGroup {...defaultProps} isFirst={true} isLast={true}/>)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            const nextButton = screen.getByRole('button', {name: /next item/i})

            expect(prevButton).toBeDisabled()
            expect(nextButton).toBeDisabled()
        })
    })

    describe('Button Colors', () => {
        it('should render previous button with primary color', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            expect(prevButton).toHaveClass('MuiButton-colorPrimary')
        })

        it('should render next button with primary color', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            expect(nextButton).toHaveClass('MuiButton-colorPrimary')
        })

        it('should render reset button with info color', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} reset={resetMock}/>)

            const resetButton = screen.getByRole('button', {name: /reset item/i})
            expect(resetButton).toHaveClass('MuiButton-colorInfo')
        })
    })

    describe('Edge Cases', () => {
        it('should handle empty label', () => {
            render(<NavigationButtonGroup {...defaultProps} label=""/>)

            expect(screen.getByRole('button', {name: /previous\s*$/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next\s*$/i})).toBeInTheDocument()
        })

        it('should handle label with special characters', () => {
            render(<NavigationButtonGroup {...defaultProps} label="Item!@#"/>)

            expect(screen.getByRole('button', {name: /previous item!@#/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next item!@#/i})).toBeInTheDocument()
        })

        it('should handle long label', () => {
            const longLabel = 'Very Long Label That Contains Multiple Words'
            render(<NavigationButtonGroup {...defaultProps} label={longLabel}/>)

            expect(screen.getByRole('button', {name: new RegExp(`previous ${longLabel}`, 'i')})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: new RegExp(`next ${longLabel}`, 'i')})).toBeInTheDocument()
        })

        it('should handle multiple clicks on same button', () => {
            const goToNextMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} goToNext={goToNextMock}/>)

            const nextButton = screen.getByRole('button', {name: /next item/i})
            fireEvent.click(nextButton)
            fireEvent.click(nextButton)
            fireEvent.click(nextButton)

            expect(goToNextMock).toHaveBeenCalledTimes(3)
        })

        it('should handle clicking all buttons in sequence', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()
            const resetMock = vi.fn()

            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    reset={resetMock}
                />
            )

            fireEvent.click(screen.getByRole('button', {name: /previous item/i}))
            fireEvent.click(screen.getByRole('button', {name: /next item/i}))
            fireEvent.click(screen.getByRole('button', {name: /reset item/i}))

            expect(goToPreviousMock).toHaveBeenCalledTimes(1)
            expect(goToNextMock).toHaveBeenCalledTimes(1)
            expect(resetMock).toHaveBeenCalledTimes(1)
        })
    })

    describe('Accessibility', () => {
        it('should have button group role', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            const buttonGroup = screen.getByRole('group')
            expect(buttonGroup).toBeInTheDocument()
        })

        it('should have accessible button names', () => {
            render(<NavigationButtonGroup {...defaultProps} label="Transaction"/>)

            expect(screen.getByRole('button', {name: /previous transaction/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next transaction/i})).toBeInTheDocument()
        })

        it('should have accessible button names with reset', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} label="Filter" reset={resetMock}/>)

            expect(screen.getByRole('button', {name: /previous filter/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next filter/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset filter/i})).toBeInTheDocument()
        })

        it('should maintain button order for keyboard navigation', () => {
            const resetMock = vi.fn()
            render(<NavigationButtonGroup {...defaultProps} reset={resetMock}/>)

            const buttons = screen.getAllByRole('button')
            expect(buttons).toHaveLength(3)
            expect(buttons[0]).toHaveTextContent(/previous/i)
            expect(buttons[1]).toHaveTextContent(/next/i)
            expect(buttons[2]).toHaveTextContent(/reset/i)
        })

        it('should maintain button order without reset', () => {
            render(<NavigationButtonGroup {...defaultProps} />)

            const buttons = screen.getAllByRole('button')
            expect(buttons).toHaveLength(2)
            expect(buttons[0]).toHaveTextContent(/previous/i)
            expect(buttons[1]).toHaveTextContent(/next/i)
        })
    })

    describe('Integration Scenarios', () => {
        it('should handle navigation at first item', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()

            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    isFirst={true}
                    isLast={false}
                />
            )

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            const nextButton = screen.getByRole('button', {name: /next item/i})

            expect(prevButton).not.toBeDisabled()
            expect(nextButton).toBeDisabled()

            fireEvent.click(prevButton)
            fireEvent.click(nextButton)

            expect(goToPreviousMock).toHaveBeenCalledTimes(1)
            expect(goToNextMock).not.toHaveBeenCalled()
        })

        it('should handle navigation at last item', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()

            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    isFirst={false}
                    isLast={true}
                />
            )

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            const nextButton = screen.getByRole('button', {name: /next item/i})

            expect(prevButton).toBeDisabled()
            expect(nextButton).not.toBeDisabled()

            fireEvent.click(prevButton)
            fireEvent.click(nextButton)

            expect(goToPreviousMock).not.toHaveBeenCalled()
            expect(goToNextMock).toHaveBeenCalledTimes(1)
        })

        it('should handle navigation in the middle', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()

            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    isFirst={false}
                    isLast={false}
                />
            )

            const prevButton = screen.getByRole('button', {name: /previous item/i})
            const nextButton = screen.getByRole('button', {name: /next item/i})

            expect(prevButton).not.toBeDisabled()
            expect(nextButton).not.toBeDisabled()

            fireEvent.click(prevButton)
            fireEvent.click(nextButton)

            expect(goToPreviousMock).toHaveBeenCalledTimes(1)
            expect(goToNextMock).toHaveBeenCalledTimes(1)
        })

        it('should handle complete navigation with reset flow', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()
            const resetMock = vi.fn()

            render(
                <NavigationButtonGroup
                    {...defaultProps}
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    reset={resetMock}
                    isFirst={false}
                    isLast={false}
                />
            )

            // Navigate next
            fireEvent.click(screen.getByRole('button', {name: /next item/i}))
            expect(goToNextMock).toHaveBeenCalledTimes(1)

            // Navigate previous
            fireEvent.click(screen.getByRole('button', {name: /previous item/i}))
            expect(goToPreviousMock).toHaveBeenCalledTimes(1)

            // Reset
            fireEvent.click(screen.getByRole('button', {name: /reset item/i}))
            expect(resetMock).toHaveBeenCalledTimes(1)
        })

        it('should handle month navigation scenario', () => {
            const goToPreviousMock = vi.fn()
            const goToNextMock = vi.fn()
            const resetMock = vi.fn()

            render(
                <NavigationButtonGroup
                    goToPrevious={goToPreviousMock}
                    goToNext={goToNextMock}
                    reset={resetMock}
                    isFirst={false}
                    isLast={false}
                    label="Month"
                    data-testid="month-navigation"
                />
            )

            expect(screen.getByTestId('month-navigation')).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /previous month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /next month/i})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /reset month/i})).toBeInTheDocument()
        })
    })
})

