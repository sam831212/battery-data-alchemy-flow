
import React from "react";
import { PanelLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface SidebarToggleButtonProps {
  className?: string;
}

export function SidebarToggleButton({ className }: SidebarToggleButtonProps) {
  return (
    <SidebarTrigger 
      className={className}
      variant="outline"
    >
      <PanelLeft className="h-5 w-5" />
    </SidebarTrigger>
  );
}
