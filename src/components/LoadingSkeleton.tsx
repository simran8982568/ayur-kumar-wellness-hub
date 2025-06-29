
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const PageLoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-white dark:bg-black">
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-800 border-b"></div>
      
      {/* Hero section skeleton */}
      <div className="mx-4 lg:mx-8 mt-4">
        <div className="h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
      </div>
      
      {/* Content sections */}
      <div className="py-12 px-4 lg:px-8 space-y-12">
        {/* Health concerns grid skeleton */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-4 w-96 mx-auto bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <Skeleton className="h-12 w-12 mx-auto mb-3 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-5 w-32 mx-auto mb-2 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-3 w-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product sections skeleton */}
        {Array(4).fill(0).map((_, sectionIndex) => (
          <div key={sectionIndex} className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <Skeleton className="h-8 w-48 mx-auto mb-2 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-4 w-64 mx-auto bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <Skeleton className="h-48 w-full bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-3 w-3/4 mb-3 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-20 mb-4 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-10 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ProductCardLoadingSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden animate-pulse">
    <Skeleton className="h-48 w-full bg-gray-200 dark:bg-gray-700" />
    <div className="p-4">
      <Skeleton className="h-5 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-3 w-3/4 mb-3 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-20 mb-4 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-10 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const CartLoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {Array(3).fill(0).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
        <Skeleton className="w-16 h-16 bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-gray-700" />
      </div>
    ))}
  </div>
);
