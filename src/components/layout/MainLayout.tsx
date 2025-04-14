
import React from "react";
import { cn } from "@/lib/utils";
import { CollapsibleSidebar } from "./CollapsibleSidebar";
import { SidebarProvider, SidebarInset, SidebarRail } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <CollapsibleSidebar />
        <SidebarRail />
        <SidebarInset className={cn("lg:pl-0", className)}>
          <div className="container py-6 md:py-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
