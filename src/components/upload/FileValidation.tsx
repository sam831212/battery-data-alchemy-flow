
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface FileValidationProps {
  files: File[];
  maxFiles: number;
  multiple: boolean;
  onValidationResult: (files: File[]) => void;
}

export const FileValidation = ({
  files,
  maxFiles,
  multiple,
  onValidationResult,
}: FileValidationProps) => {
  const { toast } = useToast();

  const validateFiles = (newFiles: File[]) => {
    if (!multiple && newFiles.length > 1) {
      toast({
        title: "Only one file can be uploaded",
        variant: "destructive",
      });
      return false;
    }

    if (multiple && newFiles.length + files.length > maxFiles) {
      toast({
        title: `Maximum ${maxFiles} files can be uploaded`,
        variant: "destructive",
      });
      return false;
    }

    const finalFiles = multiple ? [...files, ...newFiles] : newFiles;
    onValidationResult(finalFiles);
    return true;
  };

  // We only need to expose the validate function
  return null; // This is a logic-only component
};
