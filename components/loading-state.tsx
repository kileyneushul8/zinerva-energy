import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
        <p className="text-sm text-teal-600">Loading...</p>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-teal-100">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-teal-100">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-teal-100">
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  )
} 