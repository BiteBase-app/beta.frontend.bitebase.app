import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface Tab {
  id: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface Props {
  /** Tabs to display */
  tabs: Tab[];
  /** ID of the active tab */
  activeTabId?: string;
  /** Optional className for additional styling */
  className?: string;
  /** Callback when a tab is clicked */
  onTabChange?: (tabId: string) => void;
}

/**
 * TabNavigation component for horizontal page-level navigation
 */
export const TabNavigation = ({ 
  tabs, 
  activeTabId, 
  className = "",
  onTabChange 
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // If no active tab is specified, try to determine from current path
  const currentTab = activeTabId || tabs.find(tab => tab.path === location.pathname)?.id || tabs[0]?.id;
  
  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) return;
    
    if (tab.path) {
      navigate(tab.path);
    }
    
    if (onTabChange) {
      onTabChange(tab.id);
    }
  };
  
  return (
    <div className={`border-b border-border ${className}`}>
      <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            disabled={tab.disabled}
            className={`
              px-4 py-2 text-sm font-medium whitespace-nowrap
              border-b-2 -mb-px
              transition-colors
              ${currentTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent hover:text-foreground/80 hover:border-border'}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center space-x-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
