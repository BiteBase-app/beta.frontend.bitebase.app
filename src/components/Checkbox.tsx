import React from "react";
import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";

export interface Props {
  /** Checkbox label */
  label: string;
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Callback when checked state changes */
  onChange: (checked: boolean) => void;
  /** Checkbox description/helper text */
  description?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Unique ID for the checkbox */
  id?: string;
}

/**
 * Checkbox component for boolean selection
 * Wraps the shadcn Checkbox component with additional functionality
 */
export const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  description, 
  disabled = false, 
  className = "",
  id
}: Props) => {
  // Generate an ID if not provided
  const checkboxId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <CheckboxComponent
        id={checkboxId}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <div className="space-y-1">
        <label
          htmlFor={checkboxId}
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
