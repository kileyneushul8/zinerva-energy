import React from 'react'

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
                    <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
} 