import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
    
    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-4">Oops, something went wrong</h1>
          <p className="mb-4">We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="text-left bg-gray-100 p-4 rounded">
              <summary className="cursor-pointer mb-2">Error Details</summary>
              <pre className="whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;