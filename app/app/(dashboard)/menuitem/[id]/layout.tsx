import { ReactNode } from "react";

export default function MenuItemLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-6 mt-14 md:mt-0 sm:p-10">{children}</div>;
}
