import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface Props {
  /** Select label */
  label: string;
  /** Options to select from */
  options: Option[];
  /** Selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Error message to display */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Required field */
  required?: boolean;
}

/**
 * Select component for choosing from options
 * Wraps the shadcn Select component with additional functionality
 */
export const Select = ({ 
  label, 
  options, 
  value, 
  onChange, 
  error, 
  placeholder = "Select an option", 
  disabled = false, 
  className = "",
  required = false
}: Props) => {
  // Generate an ID from the label
  const id = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`space-y-2 ${className}`}>
      <Label 
        htmlFor={id}
        className="font-medium"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <SelectComponent
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger 
          id={id} 
          className={error ? "border-destructive" : ""}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectComponent>
      
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
};
