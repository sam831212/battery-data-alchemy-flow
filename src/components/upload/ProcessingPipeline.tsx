
import React from "react";
import { PipelineStages } from "@/components/pipeline/PipelineStages";
import { StageStatusType } from "@/components/pipeline/StageStatus";
import { UploadIcon, ChevronRight } from "lucide-react";

interface ProcessingPipelineProps {
  stages: {
    name: string;
    label: string;
    status: StageStatusType;
  }[];
  currentStage: number;
  pipelineStarted: boolean;
}

export const ProcessingPipeline = ({
  stages,
  currentStage,
  pipelineStarted,
}: ProcessingPipelineProps) => {
  if (!pipelineStarted) {
    return (
      <div className="mt-6 rounded-lg border-2 border-dashed p-8 text-center">
        <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground/60" />
        <h3 className="mt-4 text-lg font-medium">Ready to Process</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload files and configure experiment settings, then click "Start Processing" to begin.
        </p>
        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
          <span>Configure</span>
          <ChevronRight className="h-4 w-4" />
          <span>Process</span>
          <ChevronRight className="h-4 w-4" />
          <span>Validate</span>
          <ChevronRight className="h-4 w-4" />
          <span>Commit</span>
        </div>
      </div>
    );
  }

  return <PipelineStages stages={stages} currentStage={currentStage} />;
};
