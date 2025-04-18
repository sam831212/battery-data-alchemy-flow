
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DropZone } from "./DropZone";
import { FileValidation } from "./FileValidation";
import { FilePreview } from "./FilePreview";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  accept = ".csv,.xlsx,.txt,.json",
  multiple = true,
  maxFiles = 10,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleValidationResult = (validatedFiles: File[]) => {
    setFiles(validatedFiles);
    onFilesSelected(validatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <FileValidation
        files={files}
        maxFiles={maxFiles}
        multiple={multiple}
        onValidationResult={handleValidationResult}
      />
      
      <DropZone
        accept={accept}
        multiple={multiple}
        maxFiles={maxFiles}
        onFilesDrop={(droppedFiles) => {
          handleValidationResult(droppedFiles);
        }}
        onFileSelect={(selectedFiles) => {
          handleValidationResult(selectedFiles);
        }}
      />

      <FilePreview 
        files={files}
        onRemoveFile={handleRemoveFile}
      />
    </div>
  );
}
