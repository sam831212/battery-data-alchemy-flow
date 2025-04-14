
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FileUpload } from "@/components/upload/FileUpload";
import { ExperimentForm } from "@/components/experiment/ExperimentForm";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle,
  Check,
  ChevronRight,
  HardDrive, 
  Upload as UploadIcon
} from "lucide-react";
import { PipelineStages } from "@/components/pipeline/PipelineStages";
import { StageStatusType } from "@/components/pipeline/StageStatus";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/data/DataTable";

const DataUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [pipelineStarted, setPipelineStarted] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"idle" | "success" | "warning" | "error">("idle");
  const [isReadyToCommit, setIsReadyToCommit] = useState(false);
  const { toast } = useToast();

  // Mock preview data
  const [previewData, setPreviewData] = useState<any[]>([]);

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
    
    // Update first stage to pending
    updateStageStatus(0, "pending");

    // Simulate pipeline stages with delays
    simulateStage(0, 2000, "completed")
      .then(() => simulateStage(1, 3000, "completed"))
      .then(() => simulateStage(2, 2500, "completed"))
      .then(() => {
        // For validation stage, randomly choose between success, warning, or error
        const outcomes = ["completed", "warning"] as const;
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        return simulateStage(3, 4000, randomOutcome).then(() => {
          setValidationStatus(randomOutcome === "completed" ? "success" : "warning");
          
          // Generate mock preview data after validation
          generateMockPreviewData();
          
          // Set ready to commit if validation passed or has warnings
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
    // Simulate database persistence
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

  const columns = [
    { key: "id", header: "Cell ID" },
    { key: "cycle", header: "Cycle" },
    { key: "capacity", header: "Capacity (Ah)" },
    { key: "voltage", header: "Voltage (V)" },
    { key: "temperature", header: "Temp (°C)" },
    { key: "timestamp", header: "Date" },
  ];

  const getValidationStatusIndicator = () => {
    switch (validationStatus) {
      case "success":
        return (
          <div className="flex items-center gap-2 rounded-md bg-statusSuccess/10 p-3 text-statusSuccess">
            <Check className="h-5 w-5" />
            <span>All data passed validation. Ready to commit to database.</span>
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center gap-2 rounded-md bg-statusWarning/10 p-3 text-statusWarning">
            <AlertTriangle className="h-5 w-5" />
            <span>
              Some non-critical validation issues detected. Review the data before committing.
            </span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 rounded-md bg-statusError/10 p-3 text-statusError">
            <AlertTriangle className="h-5 w-5" />
            <span>
              Validation failed. Please fix the issues and try again.
            </span>
          </div>
        );
      default:
        return null;
    }
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
            <FileUpload 
              onFilesSelected={handleFilesSelected}
            />
            
            <ExperimentForm 
              onSubmit={handleExperimentSubmit}
              isLoading={isProcessing}
            />

            {isReadyToCommit && (
              <div className="space-y-4">
                {getValidationStatusIndicator()}
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleCommitToDatabase}
                    disabled={validationStatus === "error" || stages[4].status === "pending" || stages[4].status === "completed"}
                  >
                    {stages[4].status === "completed" ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Committed to Database
                      </>
                    ) : stages[4].status === "pending" ? (
                      "Saving to Database..."
                    ) : (
                      <>
                        <HardDrive className="mr-2 h-4 w-4" />
                        Commit to Database
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <PipelineStages 
              stages={stages}
              currentStage={currentStage}
            />

            {!pipelineStarted && (
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
            )}
          </div>
        </div>

        {previewData.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Preview</h3>
            <DataTable 
              data={previewData}
              columns={columns}
              maxHeight={400}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DataUpload;
