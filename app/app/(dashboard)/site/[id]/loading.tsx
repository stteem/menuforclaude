// a bunch of loading divs

import PlaceholderCard from "@/components/placeholder-card";

export default function Loading() {
  return (
    <>
      <div className="h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-zinc-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PlaceholderCard key={i} />
        ))}
      </div>
    </>
  );
}
