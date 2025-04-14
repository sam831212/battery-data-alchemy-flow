
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PipelineStages } from "@/components/pipeline/PipelineStages";
import { StageStatus, StageStatusType } from "@/components/pipeline/StageStatus";
import { Check, Clock, GitMerge, Play, RefreshCcw, Workflow } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Pipeline = () => {
  const [selectedPipeline, setSelectedPipeline] = useState("pipeline-1");
  
  // Mock pipeline data
  const pipelines = [
    {
      id: "pipeline-1",
      name: "Main Data Pipeline",
      description: "Processing battery cycling data from Arbin testers",
      status: "completed" as StageStatusType,
      lastRun: "2h ago",
      duration: "5m 23s",
      currentStage: 4,
      stages: [
        { name: "ingestion", label: "Data Ingestion", status: "completed" as StageStatusType },
        { name: "analysis", label: "Experiment Analysis", status: "completed" as StageStatusType },
        { name: "transformation", label: "Data Transformation", status: "completed" as StageStatusType },
        { name: "validation", label: "Data Validation", status: "completed" as StageStatusType },
        { name: "persistence", label: "Data Persistence", status: "completed" as StageStatusType },
      ],
      logs: [
        { time: "10:23:45", level: "INFO", message: "Pipeline execution started" },
        { time: "10:24:12", level: "INFO", message: "Loaded 24 data files from storage" },
        { time: "10:25:03", level: "INFO", message: "Analysis completed for experiment type: cycling" },
        { time: "10:26:18", level: "INFO", message: "Data transformation completed" },
        { time: "10:27:32", level: "INFO", message: "Validation passed with 0 errors, 2 warnings" },
        { time: "10:28:55", level: "INFO", message: "Successfully stored 1,245 records in database" },
        { time: "10:29:08", level: "INFO", message: "Pipeline execution completed successfully" },
      ],
    },
    {
      id: "pipeline-2",
      name: "Impedance Analysis Pipeline",
      description: "Processing EIS data from Bio-Logic potentiostats",
      status: "warning" as StageStatusType,
      lastRun: "1d ago",
      duration: "12m 7s",
      currentStage: 3,
      stages: [
        { name: "ingestion", label: "Data Ingestion", status: "completed" as StageStatusType },
        { name: "analysis", label: "Experiment Analysis", status: "completed" as StageStatusType },
        { name: "transformation", label: "Data Transformation", status: "completed" as StageStatusType },
        { name: "validation", label: "Data Validation", status: "warning" as StageStatusType },
        { name: "persistence", label: "Data Persistence", status: "completed" as StageStatusType },
      ],
      logs: [
        { time: "09:10:22", level: "INFO", message: "Pipeline execution started" },
        { time: "09:11:45", level: "INFO", message: "Loaded 8 EIS data files from storage" },
        { time: "09:14:31", level: "INFO", message: "Analysis completed for experiment type: impedance" },
        { time: "09:18:02", level: "INFO", message: "Data transformation completed" },
        { time: "09:20:15", level: "WARNING", message: "Validation found 0 errors, 5 warnings" },
        { time: "09:21:57", level: "INFO", message: "Successfully stored 520 records in database" },
        { time: "09:22:29", level: "INFO", message: "Pipeline execution completed with warnings" },
      ],
    },
    {
      id: "pipeline-3",
      name: "Rate Capability Pipeline",
      description: "Processing variable rate testing data",
      status: "pending" as StageStatusType,
      lastRun: "Running now",
      duration: "2m 15s (so far)",
      currentStage: 2,
      stages: [
        { name: "ingestion", label: "Data Ingestion", status: "completed" as StageStatusType },
        { name: "analysis", label: "Experiment Analysis", status: "completed" as StageStatusType },
        { name: "transformation", label: "Data Transformation", status: "pending" as StageStatusType },
        { name: "validation", label: "Data Validation", status: "not-started" as StageStatusType },
        { name: "persistence", label: "Data Persistence", status: "not-started" as StageStatusType },
      ],
      logs: [
        { time: "11:45:02", level: "INFO", message: "Pipeline execution started" },
        { time: "11:45:38", level: "INFO", message: "Loaded 12 data files from storage" },
        { time: "11:46:58", level: "INFO", message: "Analysis completed for experiment type: rate_capability" },
        { time: "11:47:17", level: "INFO", message: "Starting data transformation..." },
      ],
    },
  ];
  
  const selectedPipelineData = pipelines.find(p => p.id === selectedPipeline) || pipelines[0];
  
  const getStatusIcon = (status: StageStatusType) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-statusSuccess" />;
      case "pending":
        return <Clock className="h-5 w-5 text-statusPending animate-pulse" />;
      case "warning":
        return <Check className="h-5 w-5 text-statusWarning" />;
      case "failed":
        return <RefreshCcw className="h-5 w-5 text-statusError" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pipeline Overview</h2>
          <p className="text-muted-foreground">
            Manage and monitor your data processing pipelines
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {pipelines.map((pipeline) => (
            <Card 
              key={pipeline.id}
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedPipeline === pipeline.id ? "border-2 border-primary" : ""
              }`}
              onClick={() => setSelectedPipeline(pipeline.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                  <StageStatus status={pipeline.status} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  {pipeline.description}
                </p>
                <div className="mb-3">
                  <Progress value={(pipeline.currentStage / 4) * 100} className="h-1" />
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Last run</p>
                    <p className="font-medium">{pipeline.lastRun}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{pipeline.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <PipelineStages 
            stages={selectedPipelineData.stages}
            currentStage={selectedPipelineData.currentStage}
          />
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Pipeline Actions</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={selectedPipelineData.status === "pending"}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Rerun
                  </Button>
                  <Button 
                    size="sm" 
                    disabled={selectedPipelineData.status === "pending"}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Run Now
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Pipeline Configuration</h4>
                  <Card className="overflow-hidden">
                    <div className="divide-y">
                      {[
                        { name: "Ingestor", value: "machine_type_x.py" },
                        { name: "Experiment", value: "experiment_type_A.py" },
                        { name: "Schedule", value: "Every 6 hours" },
                        { name: "Timeout", value: "30 minutes" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between p-2.5 text-sm">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Pipeline Stats</h4>
                  <Card className="overflow-hidden">
                    <div className="divide-y">
                      {[
                        { name: "Success Rate", value: "98.2%" },
                        { name: "Average Duration", value: "6m 12s" },
                        { name: "Last Failed", value: "3d ago" },
                        { name: "Total Runs", value: "342" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between p-2.5 text-sm">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <Workflow className="mr-2 h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">Pipeline Structure</h4>
                </div>
                <div className="overflow-hidden rounded-md border bg-accent/40 p-4">
                  <pre className="text-xs">{`
# Example pipeline configuration in pipeline_config.yaml
pipeline:
  name: ${selectedPipelineData.name}
  ingestor: machine_type_x
  experiment: experiment_type_A
  stages:
    - ingestion
    - analysis
    - transformation 
    - validation
    - persistence
  config:
    validation:
      strict_mode: true
      required_fields: ["cycle", "voltage", "current", "capacity"]
    persistence:
      database: "battery_data"
      table: "cycling_results"
      batch_size: 1000
                  `}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Execution Logs</CardTitle>
              <Button variant="outline" size="sm">
                <GitMerge className="mr-2 h-4 w-4" />
                Full Logs
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[300px] overflow-y-auto rounded-md border">
              <div className="divide-y">
                {selectedPipelineData.logs.map((log, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start p-3 text-sm ${
                      log.level === "WARNING" 
                        ? "bg-amber-50 dark:bg-amber-950/20" 
                        : log.level === "ERROR"
                          ? "bg-red-50 dark:bg-red-950/20"
                          : ""
                    }`}
                  >
                    <div className="w-20 shrink-0 font-mono text-muted-foreground">
                      {log.time}
                    </div>
                    <div 
                      className={`w-16 shrink-0 font-medium ${
                        log.level === "WARNING" 
                          ? "text-amber-600 dark:text-amber-400" 
                          : log.level === "ERROR"
                            ? "text-red-600 dark:text-red-400"
                            : "text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {log.level}
                    </div>
                    <div>{log.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Pipeline;
