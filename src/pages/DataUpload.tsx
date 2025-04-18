import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FileUpload } from "@/components/upload/FileUpload";
import { ExperimentForm } from "@/components/experiment/ExperimentForm";
import { StageStatusType } from "@/components/pipeline/StageStatus";
import { useToast } from "@/components/ui/use-toast";
import { ProcessingPipeline } from "@/components/upload/ProcessingPipeline";
import { ValidationResultDisplay } from "@/components/upload/ValidationResultDisplay";
import { DataPreviewSection } from "@/components/upload/DataPreviewSection";
import { ActionButtons } from "@/components/upload/ActionButtons";

const DataUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [pipelineStarted, setPipelineStarted] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"idle" | "success" | "warning" | "error">("idle");
  const [isReadyToCommit, setIsReadyToCommit] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const { toast } = useToast();

  const pipelineStages = [
    { name: "ingestion", label: "Data Ingestion", status: "not-started" as StageStatusType },
    { name: "analysis", label: "Experiment Analysis", status: "not-started" as StageStatusType },
    { name: "transformation", label: "Data Transformation", status: "not-started" as StageStatusType },
    { name: "validation", label: "Data Validation", status: "not-started" as StageStatusType },
    { name: "persistence", label: "Data Persistence", status: "not-started" as StageStatusType },
  ];

  const [stages, setStages] = useState(pipelineStages);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    resetPipeline();
  };

  const resetPipeline = () => {
    setPipelineStarted(false);
    setCurrentStage(-1);
    setStages(pipelineStages);
    setValidationStatus("idle");
    setIsReadyToCommit(false);
    setPreviewData([]);
  };

  const handleExperimentSubmit = (values: any) => {
    console.log("Experiment configuration:", values);
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload data files before starting the process",
        variant: "destructive",
      });
      return;
    }

    // Start the pipeline simulation
    startPipelineSimulation();
  };

  const startPipelineSimulation = () => {
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
          generateMockPreviewData();
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
          
          // Set up next stage if not the last one
          if (stageIndex < stages.length - 1) {
            setCurrentStage(stageIndex + 1);
          }
          
          resolve();
        }, delay);
      }, 500);
    });
  };

  const updateStageStatus = (stageIndex: number, status: StageStatusType) => {
    setStages((prevStages) => 
      prevStages.map((stage, index) => 
        index === stageIndex ? { ...stage, status } : stage
      )
    );
  };

  const generateMockPreviewData = () => {
    // Mock data for table preview
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: `CELL_${i + 1}`,
      cycle: Math.floor(Math.random() * 100),
      capacity: Math.round((3.2 + Math.random() * 1.2) * 1000) / 1000,
      voltage: Math.round((3.5 + Math.random() * 0.8) * 100) / 100,
      temperature: Math.round((20 + Math.random() * 15) * 10) / 10,
      timestamp: new Date(
        2025, 
        Math.floor(Math.random() * 4), 
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0],
    }));
    
    setPreviewData(mockData);
  };

  const handleCommitToDatabase = () => {
    updateStageStatus(4, "pending");
    
    setTimeout(() => {
      updateStageStatus(4, "completed");
      toast({
        title: "Data committed successfully",
        description: `${previewData.length} records saved to the database`,
        variant: "default",
      });
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Upload & Processing</h2>
          <p className="text-muted-foreground">
            Upload battery test data files and process them through the pipeline
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="space-y-6 md:col-span-3">
            <FileUpload onFilesSelected={handleFilesSelected} />
            <ExperimentForm onSubmit={handleExperimentSubmit} isLoading={isProcessing} />

            {isReadyToCommit && (
              <div className="space-y-4">
                <ValidationResultDisplay validationStatus={validationStatus} />
                <ActionButtons 
                  onCommit={handleCommitToDatabase}
                  validationStatus={validationStatus}
                  persistenceStatus={stages[4].status}
                />
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <ProcessingPipeline 
              stages={stages}
              currentStage={currentStage}
              pipelineStarted={pipelineStarted}
            />
          </div>
        </div>

        <DataPreviewSection data={previewData} />
      </div>
    </MainLayout>
  );
};

export default DataUpload;
