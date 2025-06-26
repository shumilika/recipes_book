"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BodyWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <body className={isHome ? "bg-image" : "bg-other"}>
      {children}
    </body>
  );
}
