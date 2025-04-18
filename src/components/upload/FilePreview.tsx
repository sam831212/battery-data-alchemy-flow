
import React from "react";
import { Button } from "@/components/ui/button";
import { File, X } from "lucide-react";

interface FilePreviewProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export const FilePreview = ({ files, onRemoveFile }: FilePreviewProps) => {
  if (files.length === 0) return null;

  return (
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
                onRemoveFile(index);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
