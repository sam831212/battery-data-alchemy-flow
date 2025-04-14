
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

interface SelectorOption {
  value: string;
  label: string;
}

interface ConfigSelectorProps {
  label: string;
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
  description?: string;
  disabled?: boolean;
}

export function ConfigSelector({
  label,
  options,
  value,
  onChange,
  description,
  disabled = false
}: ConfigSelectorProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </FormItem>
  );
}
