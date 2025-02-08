import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
                    <h2>Something went wrong!</h2>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
