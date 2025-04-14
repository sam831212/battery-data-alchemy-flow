
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StageStatus, StageStatusType } from "./StageStatus";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PipelineStage {
  name: string;
  label: string;
  status: StageStatusType;
  description?: string;
}

interface PipelineStagesProps {
  stages: PipelineStage[];
  currentStage: number;
  className?: string;
}

export function PipelineStages({ stages, currentStage, className }: PipelineStagesProps) {
  const progress = Math.round((currentStage / (stages.length - 1)) * 100);

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Pipeline Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={cn(
                "flex items-center justify-between rounded-md border p-3",
                index === currentStage && "border-primary bg-accent"
              )}
            >
              <div className="space-y-1">
                <div className="font-medium">{stage.label}</div>
                {stage.description && (
                  <div className="text-xs text-muted-foreground">
                    {stage.description}
                  </div>
                )}
              </div>
              <StageStatus status={stage.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
