import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
// import {
//   useParams,
//   usePathname,
//   useSelectedLayoutSegments,
// } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const segments = useSelectedLayoutSegments();

  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen sm:pl-60 dark:bg-black">{children}</div>
    </div>
  );
}
