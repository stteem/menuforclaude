import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const title =
  "Kpaly – The all-in-one app for creating and managing restaurants and food menus.";
const description = `Discover MenuWise, the ultimate restaurant menu management application designed to streamline your dining experience. With our all-in-one platform, effortlessly create, customize, and manage your restaurant's menus in real-time. MenuWise offers multi-tenancy support, allowing multiple locations to operate seamlessly under one account. Enhance your online presence with custom domain support and optimize your menu for search engines to attract more customers.
                  Join the future of restaurant management with Kpaly and elevate your culinary offerings today!`;

 const image = "https://kpaly.com/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://kpaly.com/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@vercel",
  },
  metadataBase: new URL("https://kpaly.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}