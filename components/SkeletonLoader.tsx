'use client';

import React from 'react';

export type SkeletonVariant = 
  | 'text' 
  | 'title' 
  | 'paragraph' 
  | 'avatar' 
  | 'card' 
  | 'image' 
  | 'button'
  | 'input'
  | 'circle'
  | 'custom';

interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
  count?: number;
  animated?: boolean;
}

/**
 * SkeletonLoader Component
 * Beautiful skeleton loading placeholders for content
 * Provides smooth loading experience with glassmorphism design
 */
export default function SkeletonLoader({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  animated = true,
}: SkeletonLoaderProps) {
  const baseClasses = animated
    ? 'bg-white/5 backdrop-blur-sm animate-pulse rounded'
    : 'bg-white/5 backdrop-blur-sm rounded';

  const renderSkeleton = (index: number) => {
    const key = `skeleton-${variant}-${index}`;

    switch (variant) {
      case 'text':
        return (
          <div
            key={key}
            className={`${baseClasses} h-4 ${width || 'w-full'} ${className}`}
            style={{ width, height }}
          />
        );

      case 'title':
        return (
          <div
            key={key}
            className={`${baseClasses} h-8 ${width || 'w-3/4'} ${className}`}
            style={{ width, height }}
          />
        );

      case 'paragraph':
        return (
          <div key={key} className={`space-y-3 ${className}`}>
            <div className={`${baseClasses} h-4 w-full`} />
            <div className={`${baseClasses} h-4 w-full`} />
            <div className={`${baseClasses} h-4 w-5/6`} />
          </div>
        );

      case 'avatar':
        return (
          <div
            key={key}
            className={`${baseClasses} rounded-full ${
              width || 'w-12'
            } ${height || 'h-12'} ${className}`}
            style={{ width, height }}
          />
        );

      case 'card':
        return (
          <div
            key={key}
            className={`${baseClasses} ${width || 'w-full'} ${
              height || 'h-64'
            } ${className}`}
            style={{ width, height }}
          />
        );

      case 'image':
        return (
          <div
            key={key}
            className={`${baseClasses} ${width || 'w-full'} ${
              height || 'h-48'
            } ${className}`}
            style={{ width, height }}
          />
        );

      case 'button':
        return (
          <div
            key={key}
            className={`${baseClasses} ${width || 'w-32'} ${
              height || 'h-10'
            } ${className}`}
            style={{ width, height }}
          />
        );

      case 'input':
        return (
          <div
            key={key}
            className={`${baseClasses} ${width || 'w-full'} ${
              height || 'h-12'
            } ${className}`}
            style={{ width, height }}
          />
        );

      case 'circle':
        return (
          <div
            key={key}
            className={`${baseClasses} rounded-full ${width || 'w-16'} ${
              height || 'h-16'
            } ${className}`}
            style={{ width, height }}
          />
        );

      case 'custom':
        return (
          <div
            key={key}
            className={`${baseClasses} ${className}`}
            style={{ width, height }}
          />
        );

      default:
        return (
          <div
            key={key}
            className={`${baseClasses} h-4 ${width || 'w-full'} ${className}`}
            style={{ width, height }}
          />
        );
    }
  };

  if (count === 1) {
    return renderSkeleton(0);
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </div>
  );
}

// Preset skeleton layouts for common use cases
export const SkeletonPresets = {
  // Blog/Article Card
  BlogCard: () => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
      <SkeletonLoader variant="image" height="200px" />
      <SkeletonLoader variant="title" width="80%" />
      <SkeletonLoader variant="paragraph" />
      <div className="flex items-center gap-3">
        <SkeletonLoader variant="avatar" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="text" width="120px" />
          <SkeletonLoader variant="text" width="80px" />
        </div>
      </div>
    </div>
  ),

  // Service Card
  ServiceCard: () => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonLoader variant="circle" width="48px" height="48px" />
        <SkeletonLoader variant="title" width="60%" />
      </div>
      <SkeletonLoader variant="paragraph" />
      <div className="flex gap-2">
        <SkeletonLoader variant="button" />
        <SkeletonLoader variant="button" />
      </div>
    </div>
  ),

  // Profile Header
  ProfileHeader: () => (
    <div className="flex items-center gap-4">
      <SkeletonLoader variant="avatar" width="80px" height="80px" />
      <div className="flex-1 space-y-3">
        <SkeletonLoader variant="title" width="200px" />
        <SkeletonLoader variant="text" width="300px" />
        <div className="flex gap-2">
          <SkeletonLoader variant="button" width="100px" />
          <SkeletonLoader variant="button" width="100px" />
        </div>
      </div>
    </div>
  ),

  // Form Fields
  FormFields: ({ count = 3 }: { count?: number }) => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonLoader variant="text" width="120px" height="16px" />
          <SkeletonLoader variant="input" />
        </div>
      ))}
    </div>
  ),

  // Table Row
  TableRow: ({ columns = 4 }: { columns?: number }) => (
    <div className="flex gap-4 items-center py-4 border-b border-white/10">
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonLoader
          key={i}
          variant="text"
          width={i === 0 ? '200px' : '150px'}
        />
      ))}
    </div>
  ),

  // Grid Items
  GridItems: ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4"
        >
          <SkeletonLoader variant="image" height="180px" />
          <SkeletonLoader variant="title" />
          <SkeletonLoader variant="paragraph" />
        </div>
      ))}
    </div>
  ),

  // List Items
  ListItems: ({ count = 5 }: { count?: number }) => (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
        >
          <SkeletonLoader variant="circle" width="40px" height="40px" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" width="70%" />
            <SkeletonLoader variant="text" width="40%" />
          </div>
          <SkeletonLoader variant="button" width="80px" />
        </div>
      ))}
    </div>
  ),

  // Stats Cards
  StatsCards: ({ count = 4 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3"
        >
          <SkeletonLoader variant="circle" width="48px" height="48px" />
          <SkeletonLoader variant="title" width="80%" />
          <SkeletonLoader variant="text" width="50%" />
        </div>
      ))}
    </div>
  ),

  // Content Page
  ContentPage: () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Image */}
      <SkeletonLoader variant="image" height="400px" />
      
      {/* Title */}
      <SkeletonLoader variant="title" width="80%" />
      
      {/* Meta */}
      <div className="flex items-center gap-4">
        <SkeletonLoader variant="avatar" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="text" width="150px" />
          <SkeletonLoader variant="text" width="100px" />
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <SkeletonLoader variant="paragraph" />
        <SkeletonLoader variant="paragraph" />
        <SkeletonLoader variant="paragraph" />
      </div>
    </div>
  ),

  // Dashboard Widget
  DashboardWidget: () => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonLoader variant="title" width="150px" />
        <SkeletonLoader variant="button" width="100px" />
      </div>
      <SkeletonLoader variant="image" height="200px" />
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="60px" />
          <SkeletonLoader variant="title" width="80px" />
        </div>
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="60px" />
          <SkeletonLoader variant="title" width="80px" />
        </div>
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="60px" />
          <SkeletonLoader variant="title" width="80px" />
        </div>
      </div>
    </div>
  ),
};
