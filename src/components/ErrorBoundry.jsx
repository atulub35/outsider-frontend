import React from 'react'

class ErrorBoundary extends React.Component {
  /**
   * App Error Boundary which catches errors in the app and displays a fallback UI
   */
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
        return (
            <div className="error-boundary-fallback text-center">
                <h1>Something went wrong.</h1>
                <p className="bs-text-danger">{this.state.error?.message}</p>
                <button onClick={() => window.location.reload()} className="bs-btn bs-btn-primary">
                    Refresh Page
                </button>
            </div>
        )
    }

    return this.props.children
  }
}

export default ErrorBoundary 