import {
  BodyCreateReport,
  BodyCreateScheduledReport,
  BodySimulateMenuChanges,
  BodyUploadFile,
  CheckHealthData,
  CompetitorCreate,
  CompetitorType,
  ConnectDataSourceData,
  CreateCompetitorData,
  CreateFlowData,
  CreateFlowPayload,
  CreateReportData,
  CreateScheduledReportData,
  CreateUserData,
  CreateUserPayload,
  DateRangeEnum,
  DeleteFlowData,
  DeleteReportData,
  DeleteUserData,
  DisconnectDataSourceData,
  GetCategoriesData,
  GetCompetitorData,
  GetCompetitorsData,
  GetConversionRatesData,
  GetDailyTrafficData,
  GetDataSourceData,
  GetDataSourcesData,
  GetFileUploadsData,
  GetFlowData,
  GetFootTrafficDataData,
  GetHeatmapDataData,
  GetHourlyTrafficData,
  GetLangflowStatusData,
  GetLocationCompetitorsData,
  GetLocationData,
  GetLocationFootTrafficData,
  GetLocationInsightsData,
  GetLocationScoresData,
  GetMenuAnalysisData,
  GetMenuCategoriesData,
  GetMenuItemData,
  GetMenuItemsData,
  GetMenuOptimizationData,
  GetReportData,
  GetReportTemplateData,
  GetReportTemplatesData,
  GetReportsData,
  GetScheduledReportData,
  GetScheduledReportsData,
  GetTrafficSummaryData,
  GetUserData,
  GetVisitorTypesData,
  ImportFlowData,
  ImportFlowPayload,
  ListComponentsData,
  ListFlowsData,
  ListUsersData,
  LoginData,
  LoginPayload,
  ReportFrequency,
  ReportType,
  RunFlowData,
  RunFlowPayload,
  SendScheduledReportData,
  SimulateMenuChangesData,
  ToggleStarReportData,
  UpdateFlowData,
  UpdateFlowPayload,
  UpdateUserData,
  UpdateUserPayload,
  UploadFileData,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Get all data sources
   * @tags data_integration, dbtn/module:data
   * @name get_data_sources
   * @summary Get Data Sources
   * @request GET:/routes/data_integration/sources
   */
  export namespace get_data_sources {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDataSourcesData;
  }

  /**
   * @description Get a data source by ID
   * @tags data_integration, dbtn/module:data
   * @name get_data_source
   * @summary Get Data Source
   * @request GET:/routes/data_integration/sources/{source_id}
   */
  export namespace get_data_source {
    export type RequestParams = {
      /** Source Id */
      sourceId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDataSourceData;
  }

  /**
   * @description Connect to a data source
   * @tags data_integration, dbtn/module:data
   * @name connect_data_source
   * @summary Connect Data Source
   * @request POST:/routes/data_integration/sources/{source_id}/connect
   */
  export namespace connect_data_source {
    export type RequestParams = {
      /** Source Id */
      sourceId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ConnectDataSourceData;
  }

  /**
   * @description Disconnect from a data source
   * @tags data_integration, dbtn/module:data
   * @name disconnect_data_source
   * @summary Disconnect Data Source
   * @request POST:/routes/data_integration/sources/{source_id}/disconnect
   */
  export namespace disconnect_data_source {
    export type RequestParams = {
      /** Source Id */
      sourceId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DisconnectDataSourceData;
  }

  /**
   * @description Upload a file
   * @tags data_integration, dbtn/module:data
   * @name upload_file
   * @summary Upload File
   * @request POST:/routes/data_integration/upload
   */
  export namespace upload_file {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyUploadFile;
    export type RequestHeaders = {};
    export type ResponseBody = UploadFileData;
  }

  /**
   * @description Get all file uploads
   * @tags data_integration, dbtn/module:data
   * @name get_file_uploads
   * @summary Get File Uploads
   * @request GET:/routes/data_integration/uploads
   */
  export namespace get_file_uploads {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetFileUploadsData;
  }

  /**
   * @description Check if Langflow is available
   * @tags langflow, dbtn/module:langflow
   * @name get_langflow_status
   * @summary Get Langflow Status
   * @request GET:/routes/langflow/
   */
  export namespace get_langflow_status {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLangflowStatusData;
  }

  /**
   * @description List all available flows
   * @tags langflow, dbtn/module:langflow
   * @name list_flows
   * @summary List Flows
   * @request GET:/routes/langflow/flows
   */
  export namespace list_flows {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListFlowsData;
  }

  /**
   * @description Create a new flow
   * @tags langflow, dbtn/module:langflow
   * @name create_flow
   * @summary Create Flow
   * @request POST:/routes/langflow/flows
   */
  export namespace create_flow {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateFlowPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateFlowData;
  }

  /**
   * @description Get a specific flow by ID
   * @tags langflow, dbtn/module:langflow
   * @name get_flow
   * @summary Get Flow
   * @request GET:/routes/langflow/flows/{flow_id}
   */
  export namespace get_flow {
    export type RequestParams = {
      /** Flow Id */
      flowId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetFlowData;
  }

  /**
   * @description Update an existing flow
   * @tags langflow, dbtn/module:langflow
   * @name update_flow
   * @summary Update Flow
   * @request PUT:/routes/langflow/flows/{flow_id}
   */
  export namespace update_flow {
    export type RequestParams = {
      /** Flow Id */
      flowId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateFlowPayload;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateFlowData;
  }

  /**
   * @description Delete a flow
   * @tags langflow, dbtn/module:langflow
   * @name delete_flow
   * @summary Delete Flow
   * @request DELETE:/routes/langflow/flows/{flow_id}
   */
  export namespace delete_flow {
    export type RequestParams = {
      /** Flow Id */
      flowId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteFlowData;
  }

  /**
   * @description Run a specific flow with the provided inputs
   * @tags langflow, dbtn/module:langflow
   * @name run_flow
   * @summary Run Flow
   * @request POST:/routes/langflow/flows/{flow_id}/run
   */
  export namespace run_flow {
    export type RequestParams = {
      /** Flow Id */
      flowId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RunFlowPayload;
    export type RequestHeaders = {};
    export type ResponseBody = RunFlowData;
  }

  /**
   * @description Import a flow from Langflow
   * @tags langflow, dbtn/module:langflow
   * @name import_flow
   * @summary Import Flow
   * @request POST:/routes/langflow/flows/import
   */
  export namespace import_flow {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImportFlowPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ImportFlowData;
  }

  /**
   * @description List all available Langflow components
   * @tags langflow, dbtn/module:langflow
   * @name list_components
   * @summary List Components
   * @request GET:/routes/langflow/components
   */
  export namespace list_components {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListComponentsData;
  }

  /**
   * @description List all users
   * @tags users, dbtn/module:user
   * @name list_users
   * @summary List Users
   * @request GET:/routes/users/
   */
  export namespace list_users {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListUsersData;
  }

  /**
   * @description Create a new user
   * @tags users, dbtn/module:user
   * @name create_user
   * @summary Create User
   * @request POST:/routes/users/
   */
  export namespace create_user {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateUserData;
  }

  /**
   * @description Get a specific user by ID
   * @tags users, dbtn/module:user
   * @name get_user
   * @summary Get User
   * @request GET:/routes/users/{user_id}
   */
  export namespace get_user {
    export type RequestParams = {
      /** User Id */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserData;
  }

  /**
   * @description Update an existing user
   * @tags users, dbtn/module:user
   * @name update_user
   * @summary Update User
   * @request PUT:/routes/users/{user_id}
   */
  export namespace update_user {
    export type RequestParams = {
      /** User Id */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserPayload;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserData;
  }

  /**
   * @description Delete a user
   * @tags users, dbtn/module:user
   * @name delete_user
   * @summary Delete User
   * @request DELETE:/routes/users/{user_id}
   */
  export namespace delete_user {
    export type RequestParams = {
      /** User Id */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteUserData;
  }

  /**
   * @description Login a user
   * @tags users, dbtn/module:user
   * @name login
   * @summary Login
   * @request POST:/routes/users/login
   */
  export namespace login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginPayload;
    export type RequestHeaders = {};
    export type ResponseBody = LoginData;
  }

  /**
   * @description Get a list of reports with optional filtering
   * @tags dbtn/module:report
   * @name get_reports
   * @summary Get Reports
   * @request GET:/routes/
   */
  export namespace get_reports {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReportsData;
  }

  /**
   * @description Create a new report
   * @tags dbtn/module:report
   * @name create_report
   * @summary Create Report
   * @request POST:/routes/
   */
  export namespace create_report {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyCreateReport;
    export type RequestHeaders = {};
    export type ResponseBody = CreateReportData;
  }

  /**
   * @description Get detailed information about a specific location
   * @tags dbtn/module:location_analysis
   * @name get_location
   * @summary Get Location
   * @request GET:/routes/{location_id}
   */
  export namespace get_location {
    export type RequestParams = {
      /** The ID of the location to retrieve */
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationData;
  }

  /**
   * @description Get detailed score breakdown for a location
   * @tags dbtn/module:location_analysis
   * @name get_location_scores
   * @summary Get Location Scores
   * @request GET:/routes/{location_id}/scores
   */
  export namespace get_location_scores {
    export type RequestParams = {
      /** The ID of the location to retrieve scores for */
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationScoresData;
  }

  /**
   * @description Get foot traffic patterns for a location with optional time filtering
   * @tags dbtn/module:location_analysis
   * @name get_location_foot_traffic
   * @summary Get Location Foot Traffic
   * @request GET:/routes/{location_id}/foot-traffic
   */
  export namespace get_location_foot_traffic {
    export type RequestParams = {
      /** The ID of the location to retrieve foot traffic for */
      locationId: string;
    };
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationFootTrafficData;
  }

  /**
   * @description Get competitors near a specified location with optional filtering
   * @tags dbtn/module:location_analysis
   * @name get_location_competitors
   * @summary Get Location Competitors
   * @request GET:/routes/{location_id}/competitors
   */
  export namespace get_location_competitors {
    export type RequestParams = {
      /** The ID of the location to retrieve competitors for */
      locationId: string;
    };
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationCompetitorsData;
  }

  /**
   * @description Get analytical insights for a location with optional filtering
   * @tags dbtn/module:location_analysis
   * @name get_location_insights
   * @summary Get Location Insights
   * @request GET:/routes/{location_id}/insights
   */
  export namespace get_location_insights {
    export type RequestParams = {
      /** The ID of the location to retrieve insights for */
      locationId: string;
    };
    export type RequestQuery = {
      /** Category */
      category?: string | null;
      /** Severity */
      severity?: string | null;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationInsightsData;
  }

  /**
   * @description Get the list of menu items with performance data.
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_items
   * @summary Get Menu Items
   * @request GET:/routes/menu-optimization/menu-items
   */
  export namespace get_menu_items {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMenuItemsData;
  }

  /**
   * @description Get detailed information about a specific menu item.
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_item
   * @summary Get Menu Item
   * @request GET:/routes/menu-optimization/menu-items/{item_id}
   */
  export namespace get_menu_item {
    export type RequestParams = {
      /**
       * Item Id
       * Menu item ID
       */
      itemId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMenuItemData;
  }

  /**
   * @description Get menu categories with performance data.
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_categories
   * @summary Get Menu Categories
   * @request GET:/routes/menu-optimization/categories
   */
  export namespace get_menu_categories {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMenuCategoriesData;
  }

  /**
   * @description Get comprehensive menu analysis with performance metrics and recommendations.
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_analysis
   * @summary Get Menu Analysis
   * @request GET:/routes/menu-optimization/analysis
   */
  export namespace get_menu_analysis {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMenuAnalysisData;
  }

  /**
   * @description Get menu optimization recommendations based on performance data.
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_optimization
   * @summary Get Menu Optimization
   * @request GET:/routes/menu-optimization/optimization
   */
  export namespace get_menu_optimization {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMenuOptimizationData;
  }

  /**
   * @description Simulate the impact of menu changes (adding/removing items, price adjustments).
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name simulate_menu_changes
   * @summary Simulate Menu Changes
   * @request POST:/routes/menu-optimization/simulate
   */
  export namespace simulate_menu_changes {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Restaurant Id */
      restaurant_id: string;
    };
    export type RequestBody = BodySimulateMenuChanges;
    export type RequestHeaders = {};
    export type ResponseBody = SimulateMenuChangesData;
  }

  /**
   * @description Get detailed information about a specific report
   * @tags dbtn/module:report
   * @name get_report
   * @summary Get Report
   * @request GET:/routes/{report_id}
   */
  export namespace get_report {
    export type RequestParams = {
      /** The ID of the report to retrieve */
      reportId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReportData;
  }

  /**
   * @description Delete a report
   * @tags dbtn/module:report
   * @name delete_report
   * @summary Delete Report
   * @request DELETE:/routes/{report_id}
   */
  export namespace delete_report {
    export type RequestParams = {
      /** The ID of the report to delete */
      reportId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteReportData;
  }

  /**
   * @description Toggle the starred status of a report
   * @tags dbtn/module:report
   * @name toggle_star_report
   * @summary Toggle Star Report
   * @request PUT:/routes/{report_id}/star
   */
  export namespace toggle_star_report {
    export type RequestParams = {
      /** The ID of the report to star/unstar */
      reportId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ToggleStarReportData;
  }

  /**
   * @description Get a list of report templates with optional filtering
   * @tags dbtn/module:report
   * @name get_report_templates
   * @summary Get Report Templates
   * @request GET:/routes/templates/
   */
  export namespace get_report_templates {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Type */
      type?: ReportType | null;
      /** Search */
      search?: string | null;
      /** Popularity */
      popularity?: string | null;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReportTemplatesData;
  }

  /**
   * @description Get detailed information about a specific report template
   * @tags dbtn/module:report
   * @name get_report_template
   * @summary Get Report Template
   * @request GET:/routes/templates/{template_id}
   */
  export namespace get_report_template {
    export type RequestParams = {
      /** The ID of the template to retrieve */
      templateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReportTemplateData;
  }

  /**
   * @description Get a list of scheduled reports with optional filtering
   * @tags dbtn/module:report
   * @name get_scheduled_reports
   * @summary Get Scheduled Reports
   * @request GET:/routes/scheduled/
   */
  export namespace get_scheduled_reports {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Frequency */
      frequency?: ReportFrequency | null;
      /** Active */
      active?: boolean | null;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetScheduledReportsData;
  }

  /**
   * @description Create a new scheduled report
   * @tags dbtn/module:report
   * @name create_scheduled_report
   * @summary Create Scheduled Report
   * @request POST:/routes/scheduled/
   */
  export namespace create_scheduled_report {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyCreateScheduledReport;
    export type RequestHeaders = {};
    export type ResponseBody = CreateScheduledReportData;
  }

  /**
   * @description Get detailed information about a specific scheduled report
   * @tags dbtn/module:report
   * @name get_scheduled_report
   * @summary Get Scheduled Report
   * @request GET:/routes/scheduled/{schedule_id}
   */
  export namespace get_scheduled_report {
    export type RequestParams = {
      /** The ID of the scheduled report to retrieve */
      scheduleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetScheduledReportData;
  }

  /**
   * @description Send a scheduled report immediately (simulation)
   * @tags dbtn/module:report
   * @name send_scheduled_report
   * @summary Send Scheduled Report
   * @request PUT:/routes/scheduled/{schedule_id}/send
   */
  export namespace send_scheduled_report {
    export type RequestParams = {
      /** The ID of the scheduled report to send now */
      scheduleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SendScheduledReportData;
  }

  /**
   * @description Get foot traffic data for the specified date range
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_foot_traffic_data
   * @summary Get Foot Traffic Data
   * @request GET:/routes/foot_traffic/
   */
  export namespace get_foot_traffic_data {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "week" */
      date_range?: DateRangeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetFootTrafficDataData;
  }

  /**
   * @description Get traffic summary for the specified date range
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_traffic_summary
   * @summary Get Traffic Summary
   * @request GET:/routes/foot_traffic/summary
   */
  export namespace get_traffic_summary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "week" */
      date_range?: DateRangeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTrafficSummaryData;
  }

  /**
   * @description Get hourly traffic data for the specified date range
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_hourly_traffic
   * @summary Get Hourly Traffic
   * @request GET:/routes/foot_traffic/hourly
   */
  export namespace get_hourly_traffic {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "week" */
      date_range?: DateRangeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetHourlyTrafficData;
  }

  /**
   * @description Get daily traffic data for the specified date range
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_daily_traffic
   * @summary Get Daily Traffic
   * @request GET:/routes/foot_traffic/daily
   */
  export namespace get_daily_traffic {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "week" */
      date_range?: DateRangeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDailyTrafficData;
  }

  /**
   * @description Get visitor type distribution for the specified date range
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_visitor_types
   * @summary Get Visitor Types
   * @request GET:/routes/foot_traffic/visitor-types
   */
  export namespace get_visitor_types {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "week" */
      date_range?: DateRangeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetVisitorTypesData;
  }

  /**
   * @description Get conversion rates for the specified date range
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_conversion_rates
   * @summary Get Conversion Rates
   * @request GET:/routes/foot_traffic/conversion-rates
   */
  export namespace get_conversion_rates {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "week" */
      date_range?: DateRangeEnum;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetConversionRatesData;
  }

  /**
   * @description Get store traffic heatmap data
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_heatmap_data
   * @summary Get Heatmap Data
   * @request GET:/routes/foot_traffic/heatmap
   */
  export namespace get_heatmap_data {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetHeatmapDataData;
  }

  /**
   * @description Get all competitors
   * @tags competitors, dbtn/module:compettitor
   * @name get_competitors
   * @summary Get Competitors
   * @request GET:/routes/competitors/
   */
  export namespace get_competitors {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCompetitorsData;
  }

  /**
   * @description Create a new competitor
   * @tags competitors, dbtn/module:compettitor
   * @name create_competitor
   * @summary Create Competitor
   * @request POST:/routes/competitors/
   */
  export namespace create_competitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CompetitorCreate;
    export type RequestHeaders = {};
    export type ResponseBody = CreateCompetitorData;
  }

  /**
   * @description Get a competitor by ID
   * @tags competitors, dbtn/module:compettitor
   * @name get_competitor
   * @summary Get Competitor
   * @request GET:/routes/competitors/{competitor_id}
   */
  export namespace get_competitor {
    export type RequestParams = {
      /** Competitor Id */
      competitorId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCompetitorData;
  }

  /**
   * @description Get all unique competitor categories
   * @tags competitors, dbtn/module:compettitor
   * @name get_categories
   * @summary Get Categories
   * @request GET:/routes/competitors/categories
   */
  export namespace get_categories {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCategoriesData;
  }
}
