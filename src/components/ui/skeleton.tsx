import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        "bg-slate-300 dark:bg-slate-700", // Light & Dark Mode Background
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
