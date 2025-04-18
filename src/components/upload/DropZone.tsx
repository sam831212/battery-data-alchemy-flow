
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DropZoneProps {
  accept: string;
  multiple: boolean;
  maxFiles: number;
  onFilesDrop: (files: File[]) => void;
  onFileSelect: (files: File[]) => void;
}

export const DropZone = ({
  accept,
  multiple,
  maxFiles,
  onFilesDrop,
  onFileSelect,
}: DropZoneProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesDrop(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onFileSelect(selectedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
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
  );
};
