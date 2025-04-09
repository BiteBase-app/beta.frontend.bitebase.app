import React from "react";
import { useNavigate } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

export interface Props {
  /** Items to display in the breadcrumb */
  items: BreadcrumbItem[];
  /** Optional className for additional styling */
  className?: string;
  /** Maximum number of items to show (will truncate in the middle) */
  maxItems?: number;
}

/**
 * Breadcrumbs component for path-based navigation
 * Shows the current location in the navigation hierarchy
 */
export const Breadcrumbs = ({ 
  items, 
  className = "",
  maxItems = 5
}: Props) => {
  const navigate = useNavigate();
  
  // Handle truncation for long breadcrumb trails
  const visibleItems = items.length <= maxItems 
    ? items 
    : [
        ...items.slice(0, 1),
        { label: '...', path: undefined }, // Ellipsis indicator
        ...items.slice(items.length - (maxItems - 2))
      ];
  
  return (
    <nav className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center space-x-1 text-muted-foreground">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-1"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              
              {item.path && !isLast ? (
                <button
                  onClick={() => navigate(item.path!)}
                  className="hover:text-foreground transition-colors flex items-center"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </button>
              ) : (
                <span className={isLast ? "font-medium text-foreground" : ""}>
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
