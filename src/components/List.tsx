import React from "react";
import { cn } from "@/utils/cn";

export interface ListItem {
  id: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface Props {
  /** Items to display in the list */
  items: ListItem[];
  /** List variant */
  variant?: "default" | "divided" | "bordered";
  /** Render custom item content */
  renderItem?: (item: ListItem) => React.ReactNode;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * List component for displaying vertical lists of items
 * Supports different styles and custom rendering
 */
export const List = ({ 
  items, 
  variant = "default", 
  renderItem,
  emptyState,
  className = ""
}: Props) => {
  // Variant-specific styles
  const listStyles = {
    default: "space-y-1",
    divided: "divide-y divide-border",
    bordered: "border border-border rounded-md overflow-hidden",
  };
  
  // Item-specific styles based on variant
  const itemStyles = {
    default: "px-2 py-2 rounded-md hover:bg-muted",
    divided: "px-4 py-3 first:pt-4 last:pb-4",
    bordered: "px-4 py-3 border-b border-border last:border-0",
  };
  
  // Default renderer if none provided
  const defaultRenderItem = (item: ListItem) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
        <div>{item.content}</div>
      </div>
      {item.meta && <div className="text-sm text-muted-foreground">{item.meta}</div>}
    </div>
  );
  
  // Use custom renderer or default
  const renderer = renderItem || defaultRenderItem;
  
  if (items.length === 0 && emptyState) {
    return (
      <div className={cn("py-6 text-center", className)}>
        {emptyState}
      </div>
    );
  }
  
  return (
    <div className={cn(listStyles[variant], className)}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={item.disabled ? undefined : item.onClick}
          className={cn(
            itemStyles[variant],
            item.onClick && !item.disabled && "cursor-pointer",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {renderer(item)}
        </div>
      ))}
    </div>
  );
};
