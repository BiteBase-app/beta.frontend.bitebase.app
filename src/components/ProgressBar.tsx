import React from "react";
import { Progress } from "@/components/ui/progress";

export interface Props {
  /** Current value */
  value: number;
  /** Maximum value */
  max: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Whether the progress is indeterminate */
  indeterminate?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Optional className for additional styling */
  className?: string;
}

/**
 * ProgressBar component for displaying linear progress
 * Shows progress towards a goal or completion of a task
 */
export const ProgressBar = ({ 
  value, 
  max, 
  showLabel = false, 
  indeterminate = false,
  size = "md",
  className = ""
}: Props) => {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  // Format percentage for display
  const formattedPercentage = `${Math.round(percentage)}%`;
  
  // Height based on size
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  
  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        {showLabel && (
          <div className="flex justify-between items-center w-full mb-1">
            <span className="text-sm font-medium">{formattedPercentage}</span>
            <span className="text-sm text-muted-foreground">{`${value}/${max}`}</span>
          </div>
        )}
      </div>
      
      <Progress 
        value={indeterminate ? undefined : percentage} 
        className={sizeClasses[size]}
      />
    </div>
  );
};
