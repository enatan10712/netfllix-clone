import React from 'react';

export const SkeletonBanner = () => (
  <div className="relative h-[448px] md:h-[600px] bg-gray-900 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-t from-netflix-black to-transparent" />
  </div>
);

export const SkeletonRow = () => (
  <div className="px-4 md:px-12 my-8">
    <div className="h-6 w-48 bg-gray-800 rounded mb-4 animate-pulse" />
    <div className="flex space-x-4 overflow-hidden">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="min-w-[160px] h-[240px] md:min-w-[200px] md:h-[300px] bg-gray-800 rounded animate-pulse" />
      ))}
    </div>
  </div>
);
