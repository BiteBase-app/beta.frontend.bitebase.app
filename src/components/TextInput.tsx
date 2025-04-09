import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Props {
  /** Input label */
  label: string;
  /** Input value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Error message to display */
  error?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Input type (text, password, email, etc.) */
  type?: string;
  /** Optional className for additional styling */
  className?: string;
  /** Input id */
  id?: string;
  /** Required field */
  required?: boolean;
}

/**
 * TextInput component for text entry
 * Wraps the shadcn Input component with additional functionality
 */
export const TextInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  placeholder, 
  disabled = false, 
  type = "text", 
  className = "",
  id,
  required = false
}: Props) => {
  // Generate an ID if not provided
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`space-y-2 ${className}`}>
      <Label 
        htmlFor={inputId}
        className="font-medium"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <Input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? "border-destructive" : ""}
      />
      
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
};
