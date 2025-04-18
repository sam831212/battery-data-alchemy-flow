
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FileUpload } from "@/components/upload/FileUpload";
import { ExperimentForm } from "@/components/experiment/ExperimentForm";
import { useToast } from "@/components/ui/use-toast";
import { ProcessingPipeline } from "@/components/upload/ProcessingPipeline";
import { ValidationResultDisplay } from "@/components/upload/ValidationResultDisplay";
import { DataPreviewSection } from "@/components/upload/DataPreviewSection";
import { ActionButtons } from "@/components/upload/ActionButtons";
import { usePipelineSimulation } from "@/hooks/usePipelineSimulation";

const DataUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const { toast } = useToast();
  
  const {
    stages,
    currentStage,
    pipelineStarted,
    isProcessing,
    validationStatus,
    isReadyToCommit,
    startPipeline,
    resetPipeline,
  } = usePipelineSimulation();

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    resetPipeline();
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

    startPipeline();
    generateMockPreviewData();
  };

  const generateMockPreviewData = () => {
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
    const persistenceStageIndex = 4;
    stages[persistenceStageIndex].status = "pending";
    
    setTimeout(() => {
      stages[persistenceStageIndex].status = "completed";
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
