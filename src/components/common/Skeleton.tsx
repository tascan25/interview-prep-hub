import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton-shimmer rounded-md', className)} />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="p-5 rounded-xl bg-card border border-border">
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function CompanyCardSkeleton() {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  );
}
