
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton: React.FC = () => (
  <div className="border border-gray-200 bg-white dark:bg-black p-4 h-full">
    <Skeleton className="w-full h-48 mb-4 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-3 w-1/2 mb-3 bg-gray-200 dark:bg-gray-800" />
    <div className="flex items-center mb-3">
      <Skeleton className="h-3 w-16 mr-2 bg-gray-200 dark:bg-gray-800" />
      <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-800" />
    </div>
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-800" />
    </div>
    <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-800" />
  </div>
);

export const ProductGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array(8).fill(0).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

export const BlogCardSkeleton: React.FC = () => (
  <div className="border border-gray-200 bg-white dark:bg-black p-4">
    <Skeleton className="w-full h-48 mb-4 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-5 w-3/4 mb-2 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-3 w-full mb-2 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-3 w-2/3 mb-4 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-8 w-24 bg-gray-200 dark:bg-gray-800" />
  </div>
);

export const CheckoutSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-800" />
    <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-800" />
  </div>
);
