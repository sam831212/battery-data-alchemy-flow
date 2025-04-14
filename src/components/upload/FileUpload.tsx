
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (!multiple && selectedFiles.length > 1) {
      toast({
        title: "Only one file can be uploaded",
        variant: "destructive",
      });
      return;
    }

    if (multiple && selectedFiles.length + files.length > maxFiles) {
      toast({
        title: `Maximum ${maxFiles} files can be uploaded`,
        variant: "destructive",
      });
      return;
    }

    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    if (!multiple && droppedFiles.length > 1) {
      toast({
        title: "Only one file can be uploaded",
        variant: "destructive",
      });
      return;
    }

    if (multiple && droppedFiles.length + files.length > maxFiles) {
      toast({
        title: `Maximum ${maxFiles} files can be uploaded`,
        variant: "destructive",
      });
      return;
    }

    const newFiles = multiple ? [...files, ...droppedFiles] : droppedFiles;
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="bg-accent/50">
        <CardContent className="p-4">
          <div
            className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-4 transition-colors hover:bg-accent/75"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
              className="hidden"
            />
            <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
            <div className="space-y-2 text-center">
              <h3 className="text-base font-medium">
                Drag and drop files here, or click to select
              </h3>
              <p className="text-sm text-muted-foreground">
                Accepted file types: {accept.replace(/\./g, "").replace(/,/g, ", ")}
              </p>
              {multiple && (
                <p className="text-xs text-muted-foreground">
                  You can upload up to {maxFiles} files
                </p>
              )}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium">Selected Files ({files.length})</h4>
          <div className="max-h-[250px] overflow-y-auto rounded-md border">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between border-b p-3 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
