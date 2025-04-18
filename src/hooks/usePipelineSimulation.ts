
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export type StageStatusType = "not-started" | "pending" | "completed" | "failed" | "warning";

export interface PipelineStage {
  name: string;
  label: string;
  status: StageStatusType;
}

export interface UsePipelineSimulationResult {
  stages: PipelineStage[];
  currentStage: number;
  pipelineStarted: boolean;
  isProcessing: boolean;
  validationStatus: "idle" | "success" | "warning" | "error";
  isReadyToCommit: boolean;
  startPipeline: () => void;
  resetPipeline: () => void;
}

export function usePipelineSimulation(): UsePipelineSimulationResult {
  const [stages, setStages] = useState<PipelineStage[]>([
    { name: "ingestion", label: "Data Ingestion", status: "not-started" },
    { name: "analysis", label: "Experiment Analysis", status: "not-started" },
    { name: "transformation", label: "Data Transformation", status: "not-started" },
    { name: "validation", label: "Data Validation", status: "not-started" },
    { name: "persistence", label: "Data Persistence", status: "not-started" },
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [pipelineStarted, setPipelineStarted] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"idle" | "success" | "warning" | "error">("idle");
  const [isReadyToCommit, setIsReadyToCommit] = useState(false);
  const { toast } = useToast();

  const updateStageStatus = (stageIndex: number, status: StageStatusType) => {
    setStages((prevStages) =>
      prevStages.map((stage, index) =>
        index === stageIndex ? { ...stage, status } : stage
      )
    );
  };

  const simulateStage = (
    stageIndex: number,
    delay: number,
    finalStatus: StageStatusType
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentStage(stageIndex);
        updateStageStatus(stageIndex, "pending");

        setTimeout(() => {
          updateStageStatus(stageIndex, finalStatus);

          if (stageIndex < stages.length - 1) {
            setCurrentStage(stageIndex + 1);
          }

          resolve();
        }, delay);
      }, 500);
    });
  };

  const resetPipeline = () => {
    setPipelineStarted(false);
    setCurrentStage(-1);
    setStages(stages.map(stage => ({ ...stage, status: "not-started" })));
    setValidationStatus("idle");
    setIsReadyToCommit(false);
  };

  const startPipeline = () => {
    setPipelineStarted(true);
    setIsProcessing(true);
    setCurrentStage(0);
    updateStageStatus(0, "pending");

    simulateStage(0, 2000, "completed")
      .then(() => simulateStage(1, 3000, "completed"))
      .then(() => simulateStage(2, 2500, "completed"))
      .then(() => {
        const outcomes = ["completed", "warning"] as const;
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        return simulateStage(3, 4000, randomOutcome).then(() => {
          setValidationStatus(randomOutcome === "completed" ? "success" : "warning");
          setIsReadyToCommit(true);
        });
      })
      .catch((error) => {
        console.error("Pipeline simulation error:", error);
        toast({
          title: "Processing failed",
          description: "An error occurred during data processing",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return {
    stages,
    currentStage,
    pipelineStarted,
    isProcessing,
    validationStatus,
    isReadyToCommit,
    startPipeline,
    resetPipeline,
  };
}
