import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center w-full mx-auto  space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[450px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
    </div>
  );
}
