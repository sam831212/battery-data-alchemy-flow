
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";

export type StageStatusType = "completed" | "failed" | "pending" | "warning" | "not-started";

interface StageStatusProps {
  status: StageStatusType;
  label?: string;
  className?: string;
}

export function StageStatus({ status, label, className }: StageStatusProps) {
  const getStatusProps = () => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          variant: "outline" as const,
          className: "border-statusSuccess text-statusSuccess",
          text: label || "Completed",
        };
      case "failed":
        return {
          icon: <XCircle className="h-4 w-4" />,
          variant: "outline" as const,
          className: "border-statusError text-statusError",
          text: label || "Failed",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          variant: "outline" as const,
          className: "border-statusWarning text-statusWarning",
          text: label || "Warning",
        };
      case "pending":
        return {
          icon: <Clock className="h-4 w-4 animate-pulse" />,
          variant: "outline" as const,
          className: "border-statusPending text-statusPending",
          text: label || "Processing",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          variant: "outline" as const,
          className: "border-muted-foreground text-muted-foreground",
          text: label || "Not Started",
        };
    }
  };

  const { icon, variant, className: statusClassName, text } = getStatusProps();

  return (
    <Badge
      variant={variant}
      className={cn(
        "flex items-center gap-1 px-2 py-1 text-xs font-normal",
        statusClassName,
        className
      )}
    >
      {icon}
      <span>{text}</span>
    </Badge>
  );
}
