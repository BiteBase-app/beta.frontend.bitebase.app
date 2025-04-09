
// THIS FILE IS AUTOGENERATED WHEN PAGES ARE UPDATED
import { lazy } from "react";
import { RouteObject } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";



const AIAssistance = lazy(() => import("./pages/AIAssistance.tsx"));
const AIFlowAdmin = lazy(() => import("./pages/AIFlowAdmin.tsx"));
const AIPage = lazy(() => import("./pages/AIPage.tsx"));
const App = lazy(() => import("./pages/App.tsx"));
const CompettitorAnalysis = lazy(() => import("./pages/CompettitorAnalysis.tsx"));
const CompettitorProfile = lazy(() => import("./pages/CompettitorProfile.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const DashboardLayoutPreviewPage = lazy(() => import("./pages/DashboardLayoutPreviewPage.tsx"));
const DataIntegration = lazy(() => import("./pages/DataIntegration.tsx"));
const Demographic = lazy(() => import("./pages/Demographic.tsx"));
const FootTrafficAnalysis = lazy(() => import("./pages/FootTrafficAnalysis.tsx"));
const FooterPreviewPage = lazy(() => import("./pages/FooterPreviewPage.tsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.tsx"));
const LanguageSwitcherPreviewPage = lazy(() => import("./pages/LanguageSwitcherPreviewPage.tsx"));
const LocationAnalysis = lazy(() => import("./pages/LocationAnalysis.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const MenuOptimization = lazy(() => import("./pages/MenuOptimization.tsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Report = lazy(() => import("./pages/Report.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const Signup = lazy(() => import("./pages/Signup.tsx"));
const SupplyChangeOptimization = lazy(() => import("./pages/SupplyChangeOptimization.tsx"));
const TeamManagement = lazy(() => import("./pages/TeamManagement.tsx"));
const UserAvartarPreviewPage = lazy(() => import("./pages/UserAvartarPreviewPage.tsx"));

export const userRoutes: RouteObject[] = [

	{ path: "/ai-assistance", element: <AIAssistance />},
	{ path: "/aiassistance", element: <AIAssistance />},
	{ path: "/ai-flow-admin", element: <AIFlowAdmin />},
	{ path: "/aiflowadmin", element: <AIFlowAdmin />},
	{ path: "/ai-page", element: <AIPage />},
	{ path: "/aipage", element: <AIPage />},
	{ path: "/", element: <App />},
	{ path: "/compettitor-analysis", element: <CompettitorAnalysis />},
	{ path: "/compettitoranalysis", element: <CompettitorAnalysis />},
	{ path: "/compettitor-profile", element: <CompettitorProfile />},
	{ path: "/compettitorprofile", element: <CompettitorProfile />},
	{ path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
	{ path: "/dashboard-layout-preview-page", element: <DashboardLayoutPreviewPage />},
	{ path: "/dashboardlayoutpreviewpage", element: <DashboardLayoutPreviewPage />},
	{ path: "/data-integration", element: <DataIntegration />},
	{ path: "/dataintegration", element: <DataIntegration />},
	{ path: "/demographic", element: <Demographic />},
	{ path: "/foot-traffic-analysis", element: <FootTrafficAnalysis />},
	{ path: "/foottrafficanalysis", element: <FootTrafficAnalysis />},
	{ path: "/footer-preview-page", element: <FooterPreviewPage />},
	{ path: "/footerpreviewpage", element: <FooterPreviewPage />},
	{ path: "/forgot-password", element: <ForgotPassword />},
	{ path: "/language-switcher-preview-page", element: <LanguageSwitcherPreviewPage />},
	{ path: "/languageswitcherpreviewpage", element: <LanguageSwitcherPreviewPage />},
	{ path: "/location-analysis", element: <LocationAnalysis />},
	{ path: "/locationanalysis", element: <LocationAnalysis />},
	{ path: "/login", element: <Login />},
	{ path: "/menu-optimization", element: <MenuOptimization />},
	{ path: "/menuoptimization", element: <MenuOptimization />},
	{ path: "/onboarding", element: <Onboarding />},
	{ path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
	{ path: "/report", element: <Report />},
	{ path: "/settings", element: <Settings />},
	{ path: "/supply-change-optimization", element: <SupplyChangeOptimization />},
	{ path: "/supplychangeoptimization", element: <SupplyChangeOptimization />},
	{ path: "/signup", element: <Signup />},
	{ path: "/team-management", element: <TeamManagement />},
	{ path: "/teammanagement", element: <TeamManagement />},
	{ path: "/user-avartar-preview-page", element: <UserAvartarPreviewPage />},
	{ path: "/useravartarpreviewpage", element: <UserAvartarPreviewPage />},

];
