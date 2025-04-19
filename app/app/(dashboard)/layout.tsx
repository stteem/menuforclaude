import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="mt-10 md:mt-0 min-h-screen sm:pl-60 bg-white dark:bg-zinc-900 transition-colors duration-200">{children}</div>
    </div>
  );
}
