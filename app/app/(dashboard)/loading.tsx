// import LoadingDots from "@/components/icons/loading-dots";

// export default function Loading() {
//   return (
//     <>
//       <div className="h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
//       <div className="flex h-full w-full items-center justify-center">
//         <LoadingDots />
//       </div>
//     </>
//   );
// }

export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-start mt-20 items-start h-screen px-10 gap-5">
        <div className="flex items-center justify-between w-full">
          <div className="h-8 w-36 animate-pulse rounded-md bg-stone-100 dark:bg-zinc-800" />
          <div className="h-8 w-36 animate-pulse rounded-md bg-stone-100 dark:bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full h-auto">
          <div className="h-72 w-full max-w-screen-md animate-pulse rounded-md bg-stone-100 dark:bg-zinc-800" />
          <div className="h-72 w-full max-w-screen-md animate-pulse rounded-md bg-stone-100 dark:bg-zinc-800" />
        </div>
      </div>
    </>
  );
}
