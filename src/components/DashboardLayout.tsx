import React, { useState, useEffect } from "react";
import { SidebarNavigation, NavItem } from "./SidebarNavigation";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { useCurrentUser } from "app";
import LanguageSwitcher from "./LanguageSwitcher";
import UserMenu from "./UserMenu";
import { useTranslation } from "react-i18next";

export interface Props {
  /** The content of the dashboard */
  children: React.ReactNode;
  /** Navigation items for the sidebar */
  navItems?: NavItem[];
  /** Optional breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Optional header content */
  header?: React.ReactNode;
  /** Whether the sidebar should be collapsed by default */
  sidebarCollapsed?: boolean;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * Dashboard layout component with sidebar navigation
 */
export const DashboardLayout = ({
  children,
  navItems,
  breadcrumbs,
  header,
  sidebarCollapsed = false,
  className = ""
}: Props) => {
  const { user, loading } = useCurrentUser();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(sidebarCollapsed);

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background flex ${className}`}>
      <SidebarNavigation
        items={navItems}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        className="md:h-screen h-auto"
      />

      <div className="flex-1 flex flex-col overflow-auto bg-background">
        {/* Header with breadcrumbs and language switcher */}
        <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4">
          {breadcrumbs && (
            <Breadcrumbs items={breadcrumbs} className="mr-auto" />
          )}

          <div className="flex items-center gap-4">
            {header}
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </header>

        {/* Main content area with proper padding */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
