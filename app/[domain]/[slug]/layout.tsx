import React from 'react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <section>
      {children}
    </section>
  );
}