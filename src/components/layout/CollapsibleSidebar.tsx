import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Database, FileCode, GitBranch, Home, Settings, BarChart3, FileInput, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
export function CollapsibleSidebar() {
  const location = useLocation();
  const {
    state
  } = useSidebar();
  const links = [{
    href: "/",
    label: "Dashboard",
    icon: Home
  }, {
    href: "/data-upload",
    label: "Data Upload",
    icon: FileInput
  }, {
    href: "/experiment",
    label: "Experiment",
    icon: FlaskConical
  }, {
    href: "/visualization",
    label: "Visualization",
    icon: BarChart3
  }, {
    href: "/pipeline",
    label: "Pipeline",
    icon: GitBranch
  }, {
    href: "/database",
    label: "Database",
    icon: Database
  }, {
    href: "/settings",
    label: "Settings",
    icon: Settings
  }];
  return <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b border-sidebar-border bg-sidebar px-4">
        <div className="flex items-center gap-2 px-2">
          
          <span className="text-lg font-semibold text-sidebar-foreground">Battery Data </span>
        </div>
        <div className="flex-1" />
        
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {links.map(link => {
          const isActive = location.pathname === link.href;
          return <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={link.label} className={cn("transition-colors duration-200", isActive ? "bg-battery-500/10 text-battery-600 hover:bg-battery-500/20" : "hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
                  <Link to={link.href} className="flex items-center gap-3">
                    <link.icon className={cn("h-5 w-5", isActive ? "text-battery-500" : "text-muted-foreground")} />
                    <span className={cn("font-medium", isActive ? "text-battery-700" : "text-sidebar-foreground")}>
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>;
        })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>;
}