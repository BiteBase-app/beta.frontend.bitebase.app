import React from "react";

export interface Props {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg";
  /** Color of the spinner */
  color?: string;
  /** Optional className for additional styling */
  className?: string;
  /** Optional label to display */
  label?: string;
}

/**
 * Spinner component for loading indicators
 * Shows a circular animation to indicate loading state
 */
export const Spinner = ({ 
  size = "md", 
  color, 
  className = "", 
  label
}: Props) => {
  // Size classes
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };
  
  // Default color based on theme
  const spinnerColor = color || "border-primary";
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          ${spinnerColor} 
          border-t-transparent 
          animate-spin
        `}
      />
      {label && (
        <span className="mt-2 text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
};
