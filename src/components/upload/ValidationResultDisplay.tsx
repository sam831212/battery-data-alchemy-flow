
import React from "react";
import { Check, AlertTriangle } from "lucide-react";

interface ValidationResultDisplayProps {
  validationStatus: "idle" | "success" | "warning" | "error";
}

export const ValidationResultDisplay = ({ validationStatus }: ValidationResultDisplayProps) => {
  if (validationStatus === "idle") return null;

  const statusConfig = {
    success: {
      className: "bg-statusSuccess/10 text-statusSuccess",
      icon: Check,
      message: "All data passed validation. Ready to commit to database.",
    },
    warning: {
      className: "bg-statusWarning/10 text-statusWarning",
      icon: AlertTriangle,
      message: "Some non-critical validation issues detected. Review the data before committing.",
    },
    error: {
      className: "bg-statusError/10 text-statusError",
      icon: AlertTriangle,
      message: "Validation failed. Please fix the issues and try again.",
    },
  };

  const config = statusConfig[validationStatus];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 rounded-md p-3 ${config.className}`}>
      <Icon className="h-5 w-5" />
      <span>{config.message}</span>
    </div>
  );
};
