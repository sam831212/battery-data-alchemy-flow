
import React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className={cn("flex-1 p-6 md:p-8", className)}>{children}</main>
    </div>
  );
}
