import React from 'react'

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-20 bg-gray-200 rounded col-span-2"></div>
        <div className="h-20 bg-gray-200 rounded col-span-1"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  )
}