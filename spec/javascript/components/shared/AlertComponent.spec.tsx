import {describe, it, expect, vi} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import AlertComponent, {AlertProps} from '../../../../app/javascript/components/shared/AlertComponent'

describe('AlertComponent', () => {
    const defaultProps: AlertProps = {
        type: 'info',
        message: 'This is a test message',
        title: 'Test Title',
    }

    describe('Rendering', () => {
        it('should render with all required props', () => {
            render(<AlertComponent {...defaultProps} />)

            expect(screen.getByTestId('alert')).toBeInTheDocument()
            expect(screen.getByTestId('alert-title')).toHaveTextContent('Test Title')
            expect(screen.getByTestId('alert-message')).toHaveTextContent('This is a test message')
        })

        it('should render success alert', () => {
            render(<AlertComponent {...defaultProps} type="success"/>)

            const alert = screen.getByTestId('alert')
            expect(alert).toBeInTheDocument()
            expect(alert.classList.toString()).toContain('MuiAlert-standardSuccess')
        })

        it('should render warning alert', () => {
            render(<AlertComponent {...defaultProps} type="warning"/>)

            const alert = screen.getByTestId('alert')
            expect(alert).toBeInTheDocument()
            expect(alert.classList.toString()).toContain('MuiAlert-standardWarning')
        })

        it('should render error alert', () => {
            render(<AlertComponent {...defaultProps} type="error"/>)

            const alert = screen.getByTestId('alert')
            expect(alert).toBeInTheDocument()
            expect(alert.classList.toString()).toContain('MuiAlert-standardError')
        })

        it('should render info alert', () => {
            render(<AlertComponent {...defaultProps} type="info"/>)

            const alert = screen.getByTestId('alert')
            expect(alert).toBeInTheDocument()
            expect(alert.classList.toString()).toContain('MuiAlert-standardInfo')
        })

        it('should use custom dataTestId when provided', () => {
            render(
                <AlertComponent
                    {...defaultProps}
                    dataTestId="custom-alert"
                />
            )

            expect(screen.getByTestId('custom-alert')).toBeInTheDocument()
            expect(screen.getByTestId('custom-alert-title')).toBeInTheDocument()
            expect(screen.getByTestId('custom-alert-message')).toBeInTheDocument()
        })
    })

    describe('Close Button', () => {
        it('should not render close button when close prop is not provided', () => {
            render(<AlertComponent {...defaultProps} />)

            const closeButton = screen.queryByRole('button', {name: /close/i})
            expect(closeButton).not.toBeInTheDocument()
        })

        it('should render close button when close prop is provided', () => {
            const closeMock = vi.fn()
            render(<AlertComponent {...defaultProps} close={closeMock}/>)

            const closeButton = screen.getByRole('button', {name: /close/i})
            expect(closeButton).toBeInTheDocument()
        })

        it('should call close function when close button is clicked', () => {
            const closeMock = vi.fn()

            render(<AlertComponent {...defaultProps} close={closeMock}/>)

            const closeButton = screen.getByRole('button', {name: /close/i})
            fireEvent.click(closeButton)

            expect(closeMock).toHaveBeenCalledTimes(1)
        })

        it('should have CloseIcon in close button', () => {
            const closeMock = vi.fn()
            render(<AlertComponent {...defaultProps} close={closeMock}/>)

            const closeButton = screen.getByRole('button', {name: /close/i})
            const icon = closeButton.querySelector('svg')
            expect(icon).toBeInTheDocument()
        })
    })

    describe('Content Display', () => {
        it('should display correct title', () => {
            render(
                <AlertComponent
                    {...defaultProps}
                    title="Important Alert"
                />
            )

            expect(screen.getByTestId('alert-title')).toHaveTextContent('Important Alert')
        })

        it('should display correct message', () => {
            render(
                <AlertComponent
                    {...defaultProps}
                    message="This is an important message"
                />
            )

            expect(screen.getByTestId('alert-message')).toHaveTextContent('This is an important message')
        })

        it('should handle long messages', () => {
            const longMessage = 'This is a very long message that contains multiple sentences. It should still be displayed correctly in the alert component without any issues. The component should handle long text gracefully.'

            render(
                <AlertComponent
                    {...defaultProps}
                    message={longMessage}
                />
            )

            expect(screen.getByTestId('alert-message')).toHaveTextContent(longMessage)
        })

        it('should handle special characters in message', () => {
            const specialMessage = 'Special chars: !@#$%^&*()_+{}[]|:;<>?,./~`'

            render(
                <AlertComponent
                    {...defaultProps}
                    message={specialMessage}
                />
            )

            expect(screen.getByTestId('alert-message')).toHaveTextContent(specialMessage)
        })

        it('should handle empty title', () => {
            render(
                <AlertComponent
                    {...defaultProps}
                    title=""
                />
            )

            const title = screen.getByTestId('alert-title')
            expect(title).toBeInTheDocument()
            expect(title).toHaveTextContent('')
        })

        it('should handle empty message', () => {
            render(
                <AlertComponent
                    {...defaultProps}
                    message=""
                />
            )

            const message = screen.getByTestId('alert-message')
            expect(message).toBeInTheDocument()
            expect(message).toHaveTextContent('')
        })
    })

    describe('Multiple Alerts', () => {
        it('should render multiple alerts with different types', () => {
            render(
                <>
                    <AlertComponent
                        type="success"
                        message="Success message"
                        title="Success"
                        dataTestId="success-alert"
                    />
                    <AlertComponent
                        type="error"
                        message="Error message"
                        title="Error"
                        dataTestId="error-alert"
                    />
                    <AlertComponent
                        type="warning"
                        message="Warning message"
                        title="Warning"
                        dataTestId="warning-alert"
                    />
                </>
            )

            expect(screen.getByTestId('success-alert')).toBeInTheDocument()
            expect(screen.getByTestId('error-alert')).toBeInTheDocument()
            expect(screen.getByTestId('warning-alert')).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            render(<AlertComponent {...defaultProps} />)

            const alert = screen.getByTestId('alert')
            expect(alert).toHaveAttribute('role', 'alert')
        })

        it('should have accessible close button with aria-label', () => {
            const closeMock = vi.fn()
            render(<AlertComponent {...defaultProps} close={closeMock}/>)

            const closeButton = screen.getByRole('button', {name: /close/i})
            expect(closeButton).toHaveAttribute('aria-label', 'close')
        })
    })

    describe('Integration Scenarios', () => {
        it('should handle success scenario', () => {
            const closeMock = vi.fn()

            render(
                <AlertComponent
                    type="success"
                    title="Success!"
                    message="Your changes have been saved successfully."
                    close={closeMock}
                />
            )

            expect(screen.getByTestId('alert-title')).toHaveTextContent('Success!')
            expect(screen.getByTestId('alert-message')).toHaveTextContent('Your changes have been saved successfully.')
            expect(screen.getByRole('button', {name: /close/i})).toBeInTheDocument()
        })

        it('should handle error scenario without close button', () => {
            render(
                <AlertComponent
                    type="error"
                    title="Error!"
                    message="An error occurred while processing your request."
                />
            )

            expect(screen.getByTestId('alert-title')).toHaveTextContent('Error!')
            expect(screen.getByTestId('alert-message')).toHaveTextContent('An error occurred while processing your request.')
            expect(screen.queryByRole('button', {name: /close/i})).not.toBeInTheDocument()
        })

        it('should handle warning scenario with custom test id', () => {
            const closeMock = vi.fn()

            render(
                <AlertComponent
                    type="warning"
                    title="Warning"
                    message="Please review your changes before proceeding."
                    close={closeMock}
                    dataTestId="custom-warning"
                />
            )

            expect(screen.getByTestId('custom-warning')).toBeInTheDocument()
            expect(screen.getByTestId('custom-warning-title')).toHaveTextContent('Warning')
            expect(screen.getByTestId('custom-warning-message')).toHaveTextContent('Please review your changes before proceeding.')
        })
    })
})

