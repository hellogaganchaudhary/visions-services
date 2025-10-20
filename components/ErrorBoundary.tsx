'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches React errors in child components and displays a fallback UI
 * Prevents entire app from crashing due to component errors
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send error to external error tracking service (e.g., Sentry)
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    // Reload the current page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI with glassmorphism design
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          {/* Error card */}
          <div className="relative z-10 max-w-2xl w-full">
            {/* Glass card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Error icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                  {/* Icon container */}
                  <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-full p-6">
                    <AlertTriangle className="w-12 h-12 text-red-400" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Error message */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-space-grotesk">
                  Oops! Something Went Wrong
                </h1>
                <p className="text-gray-300 text-lg mb-2">
                  We encountered an unexpected error. Don't worry, our team has been notified.
                </p>
                <p className="text-gray-400 text-sm">
                  Please try refreshing the page or contact us if the problem persists.
                </p>
              </div>

              {/* Error details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 bg-black/30 border border-red-500/20 rounded-lg p-4">
                  <summary className="cursor-pointer text-red-400 font-medium mb-2 hover:text-red-300 transition-colors">
                    🔍 Error Details (Development Only)
                  </summary>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-red-300 font-semibold text-sm mb-1">Error Message:</p>
                      <pre className="text-gray-300 text-xs bg-black/50 p-3 rounded overflow-x-auto">
                        {this.state.error.message}
                      </pre>
                    </div>
                    {this.state.error.stack && (
                      <div>
                        <p className="text-red-300 font-semibold text-sm mb-1">Stack Trace:</p>
                        <pre className="text-gray-400 text-xs bg-black/50 p-3 rounded overflow-x-auto max-h-40 overflow-y-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                    {this.state.errorInfo && (
                      <div>
                        <p className="text-red-300 font-semibold text-sm mb-1">Component Stack:</p>
                        <pre className="text-gray-400 text-xs bg-black/50 p-3 rounded overflow-x-auto max-h-40 overflow-y-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Try Again button */}
                <button
                  onClick={this.handleReset}
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
                >
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Try Again
                  </span>
                </button>

                {/* Reload Page button */}
                <button
                  onClick={this.handleReload}
                  className="group px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Reload Page
                  </span>
                </button>

                {/* Go Home button */}
                <Link
                  href="/"
                  className="group px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Go Home
                </Link>
              </div>

              {/* Contact support */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm mb-3">
                  Need help? Our support team is here for you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Error code (decorative) */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-xs font-mono">
                ERROR_BOUNDARY_{Date.now()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
