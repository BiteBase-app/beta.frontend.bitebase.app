import React from "react";

export interface Props {
  /** Header content */
  header?: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * ReportLayout component for full-width layout used in report building and viewing
 * Provides a clean layout optimized for content creation and consumption
 */
export const ReportLayout = ({ 
  header, 
  children, 
  className = ""
}: Props) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      {/* Fixed header */}
      {header && (
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
          {header}
        </header>
      )}
      
      {/* Main content area */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
