import { RouterProvider } from "react-router-dom";
import { DEFAULT_THEME } from "./constants/default-theme";
import { Head } from "./internal-components/Head";
import { ThemeProvider } from "./internal-components/ThemeProvider";
import { OuterErrorBoundary } from "./prod-components/OuterErrorBoundary";
import { router } from "./router";
import { useEffect } from "react";
import "./firebase"; // Import Firebase initialization
import { AuthProvider } from "./app/auth";

export const AppWrapper = () => {
  return (
    <OuterErrorBoundary>
      <ThemeProvider defaultTheme={DEFAULT_THEME}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Head />
        </AuthProvider>
      </ThemeProvider>
    </OuterErrorBoundary>
  );
};
