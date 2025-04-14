
import React from "react";
import { cn } from "@/lib/utils";
import { CollapsibleSidebar } from "./CollapsibleSidebar";
import { SidebarProvider, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        <CollapsibleSidebar />
        <SidebarRail />
        <SidebarTrigger 
          className="fixed top-4 left-4 z-50 bg-background shadow-md rounded-md p-2 hover:bg-accent" 
          variant="outline"
        >
          <PanelLeft className="h-5 w-5" />
        </SidebarTrigger>
        <SidebarInset className={cn("lg:pl-0", className)}>
          <div className="container py-6 md:py-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
