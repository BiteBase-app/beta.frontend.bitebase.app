import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup as RadioGroupComponent, RadioGroupItem } from "@/components/ui/radio-group";

export interface Option {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface Props {
  /** Radio group label */
  label: string;
  /** Options to select from */
  options: Option[];
  /** Selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Error message to display */
  error?: string;
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
}

/**
 * RadioGroup component for exclusive selection from options
 * Wraps the shadcn RadioGroup component with additional functionality
 */
export const RadioGroup = ({ 
  label, 
  options, 
  value, 
  onChange, 
  error, 
  disabled = false, 
  className = "",
  direction = "vertical"
}: Props) => {
  // Generate a group ID from the label
  const groupId = `radio-group-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="font-medium">{label}</Label>
      
      <RadioGroupComponent
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className={`
          space-y-3
          ${direction === "horizontal" ? "flex flex-row space-y-0 space-x-4" : ""}
        `}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-2">
            <RadioGroupItem 
              value={option.value} 
              id={`${groupId}-${option.value}`}
              disabled={option.disabled || disabled}
            />
            <div className="space-y-1">
              <Label 
                htmlFor={`${groupId}-${option.value}`}
                className="font-normal"
              >
                {option.label}
              </Label>
              {option.description && (
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadioGroupComponent>
      
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
};
