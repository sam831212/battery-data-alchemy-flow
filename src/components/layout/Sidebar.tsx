
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
  FlaskConical
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <FileCode className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">Battery Data Alchemy</span>
      </div>
      <nav className="space-y-1 px-2 py-4">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center rounded-md px-4 py-2 text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <link.icon className="mr-3 h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
