import React from "react";
import { Alert as AlertComponent, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

export interface Props {
  /** Alert type/variant */
  type: "success" | "error" | "warning" | "info";
  /** Alert title */
  title?: string;
  /** Alert message */
  message: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * Alert component for persistent notification banners
 * Used to show important messages to users
 */
export const Alert = ({ 
  type, 
  title, 
  message, 
  dismissible = false, 
  onDismiss, 
  className = ""
}: Props) => {
  // Define styles based on type
  const styles = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };
  
  // Define icons based on type
  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };
  
  // Default titles if not provided
  const defaultTitles = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
  };
  
  return (
    <AlertComponent className={`${styles[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              {title && <AlertTitle className="text-sm font-medium">{title}</AlertTitle>}
              <AlertDescription className="text-sm">{message}</AlertDescription>
            </div>
            {dismissible && onDismiss && (
              <button
                type="button"
                className="ml-3 -mr-1 flex-shrink-0 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={onDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </AlertComponent>
  );
};
