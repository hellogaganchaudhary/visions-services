'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export type SpinnerVariant = 'dots' | 'circle' | 'pulse' | 'bars' | 'ring';
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'blue' | 'purple' | 'green' | 'red' | 'white' | 'gradient';

interface LoadingSpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: SpinnerColor;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

/**
 * LoadingSpinner Component
 * Beautiful animated loading indicators with multiple variants
 * Matches the site's glassmorphism design
 */
export default function LoadingSpinner({
  variant = 'circle',
  size = 'md',
  color = 'blue',
  text,
  fullScreen = false,
  className = '',
}: LoadingSpinnerProps) {
  // Size mappings
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6',
  };

  const barSizes = {
    sm: 'w-1 h-4',
    md: 'w-1.5 h-6',
    lg: 'w-2 h-8',
    xl: 'w-3 h-12',
  };

  // Color mappings
  const colorClasses = {
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    green: 'text-green-500',
    red: 'text-red-500',
    white: 'text-white',
    gradient: 'text-blue-500',
  };

  const dotColors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    white: 'bg-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
  };

  const ringColors = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    white: 'border-white',
    gradient: 'border-blue-500',
  };

  // Render different spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex items-center gap-2">
            <div
              className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
              style={{ animationDelay: '0ms' }}
            />
            <div
              className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
              style={{ animationDelay: '150ms' }}
            />
            <div
              className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
        );

      case 'circle':
        return (
          <Loader2
            className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
            strokeWidth={2.5}
          />
        );

      case 'pulse':
        return (
          <div className="relative">
            {/* Outer pulse */}
            <div
              className={`${sizeClasses[size]} ${dotColors[color]} rounded-full absolute animate-ping opacity-75`}
            />
            {/* Inner circle */}
            <div
              className={`${sizeClasses[size]} ${dotColors[color]} rounded-full relative`}
            />
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-center gap-1">
            <div
              className={`${barSizes[size]} ${dotColors[color]} rounded-full animate-pulse`}
              style={{ animationDelay: '0ms', animationDuration: '1s' }}
            />
            <div
              className={`${barSizes[size]} ${dotColors[color]} rounded-full animate-pulse`}
              style={{ animationDelay: '150ms', animationDuration: '1s' }}
            />
            <div
              className={`${barSizes[size]} ${dotColors[color]} rounded-full animate-pulse`}
              style={{ animationDelay: '300ms', animationDuration: '1s' }}
            />
            <div
              className={`${barSizes[size]} ${dotColors[color]} rounded-full animate-pulse`}
              style={{ animationDelay: '450ms', animationDuration: '1s' }}
            />
          </div>
        );

      case 'ring':
        return (
          <div
            className={`${sizeClasses[size]} rounded-full border-4 border-gray-700/30 ${ringColors[color]} border-t-transparent animate-spin`}
          />
        );

      default:
        return (
          <Loader2
            className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
          />
        );
    }
  };

  // Full screen overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner with glow effect */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            {/* Spinner */}
            <div className="relative">{renderSpinner()}</div>
          </div>

          {/* Loading text */}
          {text && (
            <p className="text-white text-lg font-medium animate-pulse">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Inline spinner
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {renderSpinner()}
      {text && (
        <p className="text-gray-400 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const LoadingSpinnerPresets = {
  // Form submission
  FormSubmitting: () => (
    <LoadingSpinner
      variant="circle"
      size="md"
      color="blue"
      text="Submitting..."
    />
  ),

  // Page loading
  PageLoading: () => (
    <LoadingSpinner
      variant="pulse"
      size="lg"
      color="blue"
      text="Loading..."
      fullScreen
    />
  ),

  // Content loading
  ContentLoading: () => (
    <LoadingSpinner
      variant="dots"
      size="md"
      color="blue"
    />
  ),

  // Small inline
  InlineLoading: () => (
    <LoadingSpinner
      variant="circle"
      size="sm"
      color="white"
    />
  ),

  // Button loading
  ButtonLoading: () => (
    <LoadingSpinner
      variant="circle"
      size="sm"
      color="white"
      className="inline-flex"
    />
  ),
};
