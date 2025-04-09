import React from "react";
import { Label } from "@/components/ui/label";
import { Slider as SliderComponent } from "@/components/ui/slider";

export interface Props {
  /** Slider label */
  label: string;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Step increment */
  step?: number;
  /** Show value label */
  showValue?: boolean;
  /** Value formatting function */
  formatValue?: (value: number) => string;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * Slider component for range selection
 * Wraps the shadcn Slider component with additional functionality
 */
export const Slider = ({ 
  label, 
  min, 
  max, 
  value, 
  onChange, 
  step = 1, 
  showValue = true, 
  formatValue,
  disabled = false, 
  className = ""
}: Props) => {
  // Generate an ID from the label
  const id = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Format the value display
  const formattedValue = formatValue ? formatValue(value) : value.toString();
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="font-medium">{label}</Label>
        {showValue && (
          <span className="text-sm font-medium">{formattedValue}</span>
        )}
      </div>
      
      <SliderComponent
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        disabled={disabled}
        className="cursor-pointer"
      />
      
      {/* Optional min/max labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
};
