// a bunch of loading divs

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-start h-screen px-10 gap-5">
      <div className="h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
      <div className="h-48 w-full max-w-screen-md animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
      <div className="h-60 w-full max-w-screen-md animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />

    </div>
  );
}
