/**
 * Error Boundary component for catching and displaying errors
 */

"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary to catch React component errors
 * Displays fallback UI when an error occurs
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.handleRetry) || (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-ink mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-ink/70 mb-6 max-w-md">
                {this.state.error.message ||
                  "An unexpected error occurred. Please try again."}
              </p>
              <button
                onClick={this.handleRetry}
                className="px-6 py-3 bg-gold text-ink font-medium rounded-lg hover:bg-gold/90 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
