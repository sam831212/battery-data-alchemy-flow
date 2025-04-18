import React from "react";
import { Button } from "@/components/ui/button";
import { Check, HardDrive } from "lucide-react";
import { StageStatusType } from "@/hooks/usePipelineSimulation";

interface ActionButtonsProps {
  onCommit: () => void;
  validationStatus: "idle" | "success" | "warning" | "error";
  persistenceStatus: StageStatusType;
}

export const ActionButtons = ({ 
  onCommit, 
  validationStatus, 
  persistenceStatus 
}: ActionButtonsProps) => {
  const isDisabled = validationStatus === "error" || 
    persistenceStatus === "pending" || 
    persistenceStatus === "completed";

  const getButtonContent = () => {
    if (persistenceStatus === "completed") {
      return (
        <>
          <Check className="mr-2 h-4 w-4" />
          Committed to Database
        </>
      );
    }
    
    if (persistenceStatus === "pending") {
      return "Saving to Database...";
    }
    
    return (
      <>
        <HardDrive className="mr-2 h-4 w-4" />
        Commit to Database
      </>
    );
  };

  return (
    <div className="flex justify-end">
      <Button onClick={onCommit} disabled={isDisabled}>
        {getButtonContent()}
      </Button>
    </div>
  );
};
