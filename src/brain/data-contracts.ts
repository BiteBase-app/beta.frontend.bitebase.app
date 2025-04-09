/** Body_create_report */
export interface BodyCreateReport {
  /** Name */
  name: string;
  /** Description */
  description: string;
  type: ReportType;
  /** Template Id */
  template_id?: string | null;
  /**
   * Settings
   * @default {}
   */
  settings?: Record<string, any>;
}

/** Body_create_scheduled_report */
export interface BodyCreateScheduledReport {
  /** Name */
  name: string;
  /** Template Id */
  template_id: string;
  frequency: ReportFrequency;
  /** Day */
  day: string;
  /** Recipients */
  recipients: string[];
  /**
   * Settings
   * @default {}
   */
  settings?: Record<string, any>;
}

/** Body_simulate_menu_changes */
export interface BodySimulateMenuChanges {
  /** Items To Remove */
  items_to_remove: string[];
  /** Items To Add */
  items_to_add: MenuItemCreate[];
  /** Price Adjustments */
  price_adjustments: Record<string, any>;
}

/** Body_upload_file */
export interface BodyUploadFile {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** CompetitorCreate */
export interface CompetitorCreate {
  /** Name */
  name: string;
  /** Location */
  location: string;
  /** Category */
  category: string;
  /** Rating */
  rating: number;
  /** Pricerange */
  priceRange: string;
  /** Distance */
  distance: string;
  /** Description */
  description: string;
  /** Website */
  website: string;
  /** Phonenumber */
  phoneNumber: string;
}

/** CompetitorDetail */
export interface CompetitorDetail {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Location */
  location: string;
  /** Category */
  category: string;
  /** Rating */
  rating: number;
  /** Pricerange */
  priceRange: string;
  /** Distance */
  distance: string;
  /** Lastupdated */
  lastUpdated: string;
  /** Description */
  description: string;
  /** Website */
  website: string;
  /** Phonenumber */
  phoneNumber: string;
  /** Openinghours */
  openingHours: Record<string, string>;
  /** Popularitems */
  popularItems: Record<string, any>[];
  /** Reviews */
  reviews: Record<string, any>[];
  /** Pricecomparison */
  priceComparison: Record<string, any>;
}

/** CompetitorType */
export enum CompetitorType {
  Direct = "direct",
  Indirect = "indirect",
  Potential = "potential",
}

/** ConversionRates */
export interface ConversionRates {
  /** Visitortocustomer */
  visitorToCustomer: number;
  /** Customertorepeat */
  customerToRepeat: number;
}

/** DailyTraffic */
export interface DailyTraffic {
  /** Day */
  day: string;
  /** Visitors */
  visitors: number;
  /** Percentage */
  percentage: number;
}

/** DataSource */
export interface DataSource {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Type */
  type: string;
  /** Icon */
  icon: string;
  /** Status */
  status: string;
  /** Lastsync */
  lastSync?: string | null;
}

/** DataSourceList */
export interface DataSourceList {
  /** Sources */
  sources: DataSource[];
}

/** DateRangeEnum */
export enum DateRangeEnum {
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "year",
}

/** FileUpload */
export interface FileUpload {
  /** Id */
  id: string;
  /** Filename */
  filename: string;
  /** Size */
  size: number;
  /** Uploaddate */
  uploadDate: string;
  /** Status */
  status: string;
  /** Type */
  type: string;
}

/** FootTrafficData */
export interface FootTrafficData {
  summary: TrafficSummary;
  /** Hourlydata */
  hourlyData: HourlyTraffic[];
  /** Dailydata */
  dailyData: DailyTraffic[];
  /** Visitortypes */
  visitorTypes: VisitorType[];
  conversionRates: ConversionRates;
}

/** FootTrafficPattern */
export interface FootTrafficPattern {
  /** Hour */
  hour: number;
  /** Weekday */
  weekday: number;
  /** Volume */
  volume: number;
  /** Description */
  description: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** HeatmapData */
export interface HeatmapData {
  /** Hightrafficareas */
  highTrafficAreas: string[];
  /** Lowtrafficareas */
  lowTrafficAreas: string[];
  /** Optimizationtips */
  optimizationTips: string[];
}

/** HourlyTraffic */
export interface HourlyTraffic {
  /** Hour */
  hour: string;
  /** Visitors */
  visitors: number;
  /** Percentage */
  percentage: number;
}

/** Location */
export interface Location {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Address */
  address: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  type: LocationType;
  /**
   * Active
   * @default true
   */
  active?: boolean;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Updated At */
  updated_at?: string | null;
  /** Description */
  description?: string | null;
  /** Score */
  score?: number | null;
}

/** LocationInsight */
export interface LocationInsight {
  /** Id */
  id: string;
  /** Location Id */
  location_id: string;
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Category */
  category: string;
  /** Severity */
  severity: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** LocationScore */
export interface LocationScore {
  /** Category */
  category: string;
  /** Score */
  score: number;
  /** Weight */
  weight: number;
  /** Description */
  description: string;
}

/** LocationScoreDetails */
export interface LocationScoreDetails {
  /** Overall */
  overall: number;
  /** Foot Traffic */
  foot_traffic: number;
  /** Restaurant Density */
  restaurant_density: number;
  /** Income Level */
  income_level: number;
  /** Competition */
  competition: number;
  /** Accessibility */
  accessibility: number;
  /** Parking */
  parking: number;
  /** Public Transport */
  public_transport: number;
  /** Visibility */
  visibility: number;
  /** Detailed Scores */
  detailed_scores: LocationScore[];
}

/** LocationType */
export enum LocationType {
  Urban = "urban",
  Suburban = "suburban",
  Rural = "rural",
  Downtown = "downtown",
  ShoppingMall = "shopping_mall",
  BusinessDistrict = "business_district",
  Residential = "residential",
  MixedUse = "mixed_use",
  TransitHub = "transit_hub",
  Campus = "campus",
}

/** MenuAnalysis */
export interface MenuAnalysis {
  /** Complexity Score */
  complexity_score: number;
  /** Top Performers */
  top_performers: MenuItemPerformance[];
  /** Low Performers */
  low_performers: MenuItemPerformance[];
  /** Categories */
  categories: MenuCategory[];
  /** Average Profit Margin */
  average_profit_margin: number;
  /** Menu Performance Score */
  menu_performance_score: number;
  /** Recommendations */
  recommendations: string[];
}

/** MenuCategory */
export interface MenuCategory {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Item Count */
  item_count: number;
  /** Average Profit Margin */
  average_profit_margin: number;
  /** Total Sales */
  total_sales: number;
  /** Total Revenue */
  total_revenue: number;
}

/** MenuItemCreate */
export interface MenuItemCreate {
  /** Name */
  name: string;
  /** Category */
  category: string;
  /** Price */
  price: number;
  /** Cost */
  cost: number;
  /** Description */
  description?: string | null;
  /** Image Url */
  image_url?: string | null;
  /** Ingredients */
  ingredients?: string[] | null;
  /** Allergens */
  allergens?: string[] | null;
  /**
   * Is Vegetarian
   * @default false
   */
  is_vegetarian?: boolean | null;
  /**
   * Is Vegan
   * @default false
   */
  is_vegan?: boolean | null;
  /**
   * Is Gluten Free
   * @default false
   */
  is_gluten_free?: boolean | null;
}

/** MenuItemPerformance */
export interface MenuItemPerformance {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Category */
  category: string;
  /** Price */
  price: number;
  /** Cost */
  cost: number;
  /** Profit Margin */
  profit_margin: number;
  /** Popularity */
  popularity: number;
  /** Sales Count */
  sales_count: number;
  /** Revenue */
  revenue: number;
  /** Description */
  description?: string | null;
  /** Image Url */
  image_url?: string | null;
  /** Trend */
  trend?: string | null;
  /** Recommendation */
  recommendation?: string | null;
}

/** MenuOptimizationResult */
export interface MenuOptimizationResult {
  /** Items To Keep */
  items_to_keep: string[];
  /** Items To Promote */
  items_to_promote: string[];
  /** Items To Adjust Price */
  items_to_adjust_price: string[];
  /** Items To Remove */
  items_to_remove: string[];
  /** Suggested New Items */
  suggested_new_items: string[];
  /** Complexity Recommendation */
  complexity_recommendation: string;
  /** Estimated Profit Increase */
  estimated_profit_increase: number;
}

/** Report */
export interface Report {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string;
  type: ReportType;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Updated At */
  updated_at?: string | null;
  /** Generated By */
  generated_by: string;
  /**
   * Starred
   * @default false
   */
  starred?: boolean;
  /** Metrics */
  metrics?: ReportMetric[] | null;
  /** Data Points */
  data_points?: ReportDataPoint[] | null;
  /** Insights */
  insights?: string[] | null;
  /**
   * Settings
   * @default {}
   */
  settings?: Record<string, any>;
}

/** ReportDataPoint */
export interface ReportDataPoint {
  /**
   * Date
   * @format date-time
   */
  date: string;
  /** Orders */
  orders: number;
  /** Revenue */
  revenue: number;
  /** Avg Order */
  avg_order: number;
  /** Profit */
  profit: number;
}

/** ReportFrequency */
export enum ReportFrequency {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Quarterly = "quarterly",
  Annual = "annual",
  Once = "once",
}

/** ReportMetric */
export interface ReportMetric {
  /** Name */
  name: string;
  /** Value */
  value: number | string;
  /** Change */
  change?: number | null;
  /** Trend */
  trend?: string | null;
  /** Format */
  format?: string | null;
}

/** ReportTemplate */
export interface ReportTemplate {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Description */
  description: string;
  type: ReportType;
  /** Category */
  category: string;
  /** Popularity */
  popularity: string;
  /**
   * Default Settings
   * @default {}
   */
  default_settings?: Record<string, any>;
}

/** ReportType */
export enum ReportType {
  Financial = "financial",
  Operational = "operational",
  Analytics = "analytics",
  Marketing = "marketing",
  Hr = "hr",
  Inventory = "inventory",
  Custom = "custom",
}

/** ScheduledReport */
export interface ScheduledReport {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Template Id */
  template_id: string;
  frequency: ReportFrequency;
  /** Day */
  day: string;
  /** Recipients */
  recipients: string[];
  /** Last Sent */
  last_sent?: string | null;
  /** Next Scheduled */
  next_scheduled?: string | null;
  /**
   * Settings
   * @default {}
   */
  settings?: Record<string, any>;
  /**
   * Active
   * @default true
   */
  active?: boolean;
}

/** TrafficSummary */
export interface TrafficSummary {
  /** Totalvisitors */
  totalVisitors: number;
  /** Averagedaily */
  averageDaily: number;
  /** Peakhour */
  peakHour: string;
  /** Peakday */
  peakDay: string;
  /** Changepercentage */
  changePercentage: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** VisitorType */
export interface VisitorType {
  /** Type */
  type: string;
  /** Percentage */
  percentage: number;
}

/** Competitor */
export interface AppApisCompettitorCompetitor {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Location */
  location: string;
  /** Category */
  category: string;
  /** Rating */
  rating: number;
  /** Pricerange */
  priceRange: string;
  /** Distance */
  distance: string;
  /** Lastupdated */
  lastUpdated: string;
}

/** Competitor */
export interface AppApisLocationAnalysisCompetitor {
  /** Id */
  id: string;
  /** Name */
  name: string;
  type: CompetitorType;
  /** Distance Miles */
  distance_miles: number;
  /** Address */
  address: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  /** Rating */
  rating?: number | null;
  /** Price Level */
  price_level?: number | null;
  /** Categories */
  categories: string[];
  /** Estimated Revenue */
  estimated_revenue?: number | null;
}

/** Body_upload_dataset */
export interface BodyUploadDataset {
  /**
   * File
   * @format binary
   */
  file: File;
  /** Dataset Name */
  dataset_name?: string | null;
}

/** Competitor */
export interface Competitor {
  /** Id */
  id: string;
  /** Name */
  name: string;
  type: CompetitorType;
  /** Distance Miles */
  distance_miles: number;
  /** Address */
  address: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  /** Rating */
  rating?: number | null;
  /** Price Level */
  price_level?: number | null;
  /** Categories */
  categories: string[];
  /** Estimated Revenue */
  estimated_revenue?: number | null;
}

/** AgeGroup */
export interface AgeGroup {
  /** Group */
  group: string;
  /** Percentage */
  percentage: number;
  /** Count */
  count: number;
}

/** DemographicData */
export interface DemographicData {
  overview: DemographicOverview;
  /** Agegroups */
  ageGroups: AgeGroup[];
  /** Incomegroups */
  incomeGroups: IncomeGroup[];
  /** Interests */
  interests: Interest[];
}

/** DemographicOverview */
export interface DemographicOverview {
  /** Totalcustomers */
  totalCustomers: number;
  /** Malepercentage */
  malePercentage: number;
  /** Femalepercentage */
  femalePercentage: number;
  /** Averageage */
  averageAge: number;
  /** Topzipcodes */
  topZipCodes: string[];
  /** Customergrowth */
  customerGrowth: string;
}

/** DiningPreference */
export interface DiningPreference {
  /** Preference */
  preference: string;
  /** Percentage */
  percentage: number;
}

/** IncomeGroup */
export interface IncomeGroup {
  /** Group */
  group: string;
  /** Percentage */
  percentage: number;
  /** Count */
  count: number;
}

/** Interest */
export interface Interest {
  /** Category */
  category: string;
  /** Percentage */
  percentage: number;
  /** Count */
  count: number;
}

/** SocialMedia */
export interface SocialMedia {
  /** Platform */
  platform: string;
  /** Percentage */
  percentage: number;
}

export type CheckHealthData = HealthResponse;

export type GetDataSourcesData = DataSourceList;

export interface GetDataSourceParams {
  /** Source Id */
  sourceId: string;
}

export type GetDataSourceData = DataSource;

export type GetDataSourceError = HTTPValidationError;

export interface ConnectDataSourceParams {
  /** Source Id */
  sourceId: string;
}

export type ConnectDataSourceData = DataSource;

export type ConnectDataSourceError = HTTPValidationError;

export interface DisconnectDataSourceParams {
  /** Source Id */
  sourceId: string;
}

export type DisconnectDataSourceData = DataSource;

export type DisconnectDataSourceError = HTTPValidationError;

export type UploadFileData = FileUpload;

export type UploadFileError = HTTPValidationError;

/** Response Get File Uploads */
export type GetFileUploadsData = FileUpload[];

export type GetLangflowStatusData = any;

export type ListFlowsData = any;

/** Flow Data */
export type CreateFlowPayload = Record<string, any>;

export type CreateFlowData = any;

export type CreateFlowError = HTTPValidationError;

export interface GetFlowParams {
  /** Flow Id */
  flowId: string;
}

export type GetFlowData = any;

export type GetFlowError = HTTPValidationError;

/** Flow Data */
export type UpdateFlowPayload = Record<string, any>;

export interface UpdateFlowParams {
  /** Flow Id */
  flowId: string;
}

export type UpdateFlowData = any;

export type UpdateFlowError = HTTPValidationError;

export interface DeleteFlowParams {
  /** Flow Id */
  flowId: string;
}

export type DeleteFlowData = any;

export type DeleteFlowError = HTTPValidationError;

/** Inputs */
export type RunFlowPayload = Record<string, any>;

export interface RunFlowParams {
  /** Flow Id */
  flowId: string;
}

export type RunFlowData = any;

export type RunFlowError = HTTPValidationError;

/** Flow Data */
export type ImportFlowPayload = Record<string, any>;

export type ImportFlowData = any;

export type ImportFlowError = HTTPValidationError;

export type ListComponentsData = any;

export type ListUsersData = any;

/** User Data */
export type CreateUserPayload = Record<string, any>;

export type CreateUserData = any;

export type CreateUserError = HTTPValidationError;

export interface GetUserParams {
  /** User Id */
  userId: string;
}

export type GetUserData = any;

export type GetUserError = HTTPValidationError;

/** User Data */
export type UpdateUserPayload = Record<string, any>;

export interface UpdateUserParams {
  /** User Id */
  userId: string;
}

export type UpdateUserData = any;

export type UpdateUserError = HTTPValidationError;

export interface DeleteUserParams {
  /** User Id */
  userId: string;
}

export type DeleteUserData = any;

export type DeleteUserError = HTTPValidationError;

/** Credentials */
export type LoginPayload = Record<string, string>;

export type LoginData = any;

export type LoginError = HTTPValidationError;

export interface GetReportsParams {
  /** Type */
  type?: ReportType | null;
  /** Search */
  search?: string | null;
  /** Starred */
  starred?: boolean | null;
  /**
   * Limit
   * @min 1
   * @max 100
   * @default 10
   */
  limit?: number;
  /**
   * Skip
   * @min 0
   * @default 0
   */
  skip?: number;
}

/** Response Get Reports */
export type GetReportsData = Report[];

export type GetReportsError = HTTPValidationError;

export type CreateReportData = Report;

export type CreateReportError = HTTPValidationError;

export interface GetLocationParams {
  /** The ID of the location to retrieve */
  locationId: string;
}

export type GetLocationData = Location;

export type GetLocationError = HTTPValidationError;

export interface GetLocationScoresParams {
  /** The ID of the location to retrieve scores for */
  locationId: string;
}

export type GetLocationScoresData = LocationScoreDetails;

export type GetLocationScoresError = HTTPValidationError;

export interface GetLocationFootTrafficParams {
  /**
   * Day
   * Filter by day of week (0=Monday, 6=Sunday)
   */
  day?: number | null;
  /**
   * Min Hour
   * Filter by minimum hour
   */
  min_hour?: number | null;
  /**
   * Max Hour
   * Filter by maximum hour
   */
  max_hour?: number | null;
  /** The ID of the location to retrieve foot traffic for */
  locationId: string;
}

/** Response Get Location Foot Traffic */
export type GetLocationFootTrafficData = FootTrafficPattern[];

export type GetLocationFootTrafficError = HTTPValidationError;

export interface GetLocationCompetitorsParams {
  /** Type */
  type?: CompetitorType | null;
  /**
   * Max Distance
   * Maximum distance in miles
   */
  max_distance?: number | null;
  /**
   * Limit
   * @min 1
   * @max 50
   * @default 10
   */
  limit?: number;
  /** The ID of the location to retrieve competitors for */
  locationId: string;
}

/** Response Get Location Competitors */
export type GetLocationCompetitorsData = AppApisLocationAnalysisCompetitor[];

export type GetLocationCompetitorsError = HTTPValidationError;

export interface GetLocationInsightsParams {
  /** Category */
  category?: string | null;
  /** Severity */
  severity?: string | null;
  /** The ID of the location to retrieve insights for */
  locationId: string;
}

/** Response Get Location Insights */
export type GetLocationInsightsData = LocationInsight[];

export type GetLocationInsightsError = HTTPValidationError;

export interface GetMenuItemsParams {
  /**
   * Restaurant Id
   * Restaurant ID
   */
  restaurant_id?: string | null;
  /**
   * Category
   * Filter by category
   */
  category?: string | null;
  /**
   * Sort By
   * Sort by field (popularity, profit_margin, sales_count, revenue)
   * @default "popularity"
   */
  sort_by?: string | null;
  /**
   * Sort Order
   * Sort order (asc, desc)
   * @default "desc"
   */
  sort_order?: string | null;
}

/** Response Get Menu Items */
export type GetMenuItemsData = MenuItemPerformance[];

export type GetMenuItemsError = HTTPValidationError;

export interface GetMenuItemParams {
  /**
   * Item Id
   * Menu item ID
   */
  itemId: string;
}

export type GetMenuItemData = MenuItemPerformance;

export type GetMenuItemError = HTTPValidationError;

export interface GetMenuCategoriesParams {
  /**
   * Restaurant Id
   * Restaurant ID
   */
  restaurant_id?: string | null;
  /**
   * Sort By
   * Sort by field (total_revenue, average_profit_margin, total_sales)
   * @default "total_revenue"
   */
  sort_by?: string | null;
  /**
   * Sort Order
   * Sort order (asc, desc)
   * @default "desc"
   */
  sort_order?: string | null;
}

/** Response Get Menu Categories */
export type GetMenuCategoriesData = MenuCategory[];

export type GetMenuCategoriesError = HTTPValidationError;

export interface GetMenuAnalysisParams {
  /**
   * Restaurant Id
   * Restaurant ID
   */
  restaurant_id?: string | null;
  /**
   * Time Period
   * Time period for analysis (last_week, last_month, last_quarter, last_year)
   * @default "last_month"
   */
  time_period?: string | null;
}

export type GetMenuAnalysisData = MenuAnalysis;

export type GetMenuAnalysisError = HTTPValidationError;

export interface GetMenuOptimizationParams {
  /**
   * Restaurant Id
   * Restaurant ID
   */
  restaurant_id?: string | null;
  /**
   * Target
   * Optimization target (profit, popularity, balanced)
   * @default "balanced"
   */
  target?: string | null;
}

export type GetMenuOptimizationData = MenuOptimizationResult;

export type GetMenuOptimizationError = HTTPValidationError;

export interface SimulateMenuChangesParams {
  /** Restaurant Id */
  restaurant_id: string;
}

export type SimulateMenuChangesData = MenuOptimizationResult;

export type SimulateMenuChangesError = HTTPValidationError;

export interface GetReportParams {
  /** The ID of the report to retrieve */
  reportId: string;
}

export type GetReportData = Report;

export type GetReportError = HTTPValidationError;

export interface DeleteReportParams {
  /** The ID of the report to delete */
  reportId: string;
}

export type DeleteReportData = any;

export type DeleteReportError = HTTPValidationError;

export interface ToggleStarReportParams {
  /** The ID of the report to star/unstar */
  reportId: string;
}

export type ToggleStarReportData = Report;

export type ToggleStarReportError = HTTPValidationError;

export interface GetReportTemplatesParams {
  /** Type */
  type?: ReportType | null;
  /** Search */
  search?: string | null;
  /** Popularity */
  popularity?: string | null;
}

/** Response Get Report Templates */
export type GetReportTemplatesData = ReportTemplate[];

export type GetReportTemplatesError = HTTPValidationError;

export interface GetReportTemplateParams {
  /** The ID of the template to retrieve */
  templateId: string;
}

export type GetReportTemplateData = ReportTemplate;

export type GetReportTemplateError = HTTPValidationError;

export interface GetScheduledReportsParams {
  /** Frequency */
  frequency?: ReportFrequency | null;
  /** Active */
  active?: boolean | null;
}

/** Response Get Scheduled Reports */
export type GetScheduledReportsData = ScheduledReport[];

export type GetScheduledReportsError = HTTPValidationError;

export type CreateScheduledReportData = ScheduledReport;

export type CreateScheduledReportError = HTTPValidationError;

export interface GetScheduledReportParams {
  /** The ID of the scheduled report to retrieve */
  scheduleId: string;
}

export type GetScheduledReportData = ScheduledReport;

export type GetScheduledReportError = HTTPValidationError;

export interface SendScheduledReportParams {
  /** The ID of the scheduled report to send now */
  scheduleId: string;
}

export type SendScheduledReportData = ScheduledReport;

export type SendScheduledReportError = HTTPValidationError;

export interface GetFootTrafficDataParams {
  /** @default "week" */
  date_range?: DateRangeEnum;
}

export type GetFootTrafficDataData = FootTrafficData;

export type GetFootTrafficDataError = HTTPValidationError;

export interface GetTrafficSummaryParams {
  /** @default "week" */
  date_range?: DateRangeEnum;
}

export type GetTrafficSummaryData = TrafficSummary;

export type GetTrafficSummaryError = HTTPValidationError;

export interface GetHourlyTrafficParams {
  /** @default "week" */
  date_range?: DateRangeEnum;
}

/** Response Get Hourly Traffic */
export type GetHourlyTrafficData = HourlyTraffic[];

export type GetHourlyTrafficError = HTTPValidationError;

export interface GetDailyTrafficParams {
  /** @default "week" */
  date_range?: DateRangeEnum;
}

/** Response Get Daily Traffic */
export type GetDailyTrafficData = DailyTraffic[];

export type GetDailyTrafficError = HTTPValidationError;

export interface GetVisitorTypesParams {
  /** @default "week" */
  date_range?: DateRangeEnum;
}

/** Response Get Visitor Types */
export type GetVisitorTypesData = VisitorType[];

export type GetVisitorTypesError = HTTPValidationError;

export interface GetConversionRatesParams {
  /** @default "week" */
  date_range?: DateRangeEnum;
}

export type GetConversionRatesData = ConversionRates;

export type GetConversionRatesError = HTTPValidationError;

export type GetHeatmapDataData = HeatmapData;

/** Response Get Competitors */
export type GetCompetitorsData = AppApisCompettitorCompetitor[];

export type CreateCompetitorData = AppApisCompettitorCompetitor;

export type CreateCompetitorError = HTTPValidationError;

export interface GetCompetitorParams {
  /** Competitor Id */
  competitorId: string;
}

export type GetCompetitorData = CompetitorDetail;

export type GetCompetitorError = HTTPValidationError;

/** Response Get Categories */
export type GetCategoriesData = string[];

// ChatMessage interface for AI chat functionality
export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date | number | string;
}

// ChatRequest interface for chat API requests
export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

// Flow interfaces for AI Flow functionality
export interface FlowInfo {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FlowDetailResponse {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  edges: any[];
  created_at: string;
  updated_at: string;
}

export interface FlowRequest {
  name: string;
  description: string;
  nodes?: any[];
  edges?: any[];
}
