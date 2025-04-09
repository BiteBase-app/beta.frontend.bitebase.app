import React from "react";

export interface Props {
  /** Content to display in the panel */
  children: React.ReactNode;
  /** Elevation level affects shadow and border opacity */
  elevation?: "none" | "sm" | "md" | "lg";
  /** Apply backdrop blur effect */
  blur?: boolean;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * GlassPanel component for translucent container with blur effect
 * Creates a modern glass effect container for content
 */
export const GlassPanel = ({ 
  children, 
  elevation = "md", 
  blur = true,
  className = ""
}: Props) => {
  // Define styles based on elevation
  const elevationStyles = {
    none: "border-0 shadow-none",
    sm: "border border-white/10 shadow-sm",
    md: "border border-white/10 shadow-md",
    lg: "border border-white/10 shadow-lg",
  };
  
  return (
    <div 
      className={`
        rounded-lg
        bg-white/5
        ${blur ? "backdrop-blur-[15px]" : ""}
        ${elevationStyles[elevation]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
