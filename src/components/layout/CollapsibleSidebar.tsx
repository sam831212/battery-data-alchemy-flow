
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Database, 
  FileCode, 
  GitBranch, 
  Home, 
  Settings, 
  BarChart3,
  FileInput,
  FlaskConical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

export function CollapsibleSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  
  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/data-upload", label: "Data Upload", icon: FileInput },
    { href: "/experiment", label: "Experiment", icon: FlaskConical },
    { href: "/visualization", label: "Visualization", icon: BarChart3 },
    { href: "/pipeline", label: "Pipeline", icon: GitBranch },
    { href: "/database", label: "Database", icon: Database },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center px-6">
        <FileCode className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">Battery Data Alchemy</span>
        <div className="flex-1" />
        <SidebarTrigger>
          {state === "expanded" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  tooltip={link.label}
                >
                  <Link to={link.href}>
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
