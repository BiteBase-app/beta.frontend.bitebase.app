import {
  BodyCreateReport,
  BodyCreateScheduledReport,
  BodySimulateMenuChanges,
  BodyUploadFile,
  CheckHealthData,
  CompetitorCreate,
  ConnectDataSourceData,
  ConnectDataSourceError,
  ConnectDataSourceParams,
  CreateCompetitorData,
  CreateCompetitorError,
  CreateFlowData,
  CreateFlowError,
  CreateFlowPayload,
  CreateReportData,
  CreateReportError,
  CreateScheduledReportData,
  CreateScheduledReportError,
  CreateUserData,
  CreateUserError,
  CreateUserPayload,
  DeleteFlowData,
  DeleteFlowError,
  DeleteFlowParams,
  DeleteReportData,
  DeleteReportError,
  DeleteReportParams,
  DeleteUserData,
  DeleteUserError,
  DeleteUserParams,
  DisconnectDataSourceData,
  DisconnectDataSourceError,
  DisconnectDataSourceParams,
  GetCategoriesData,
  GetCompetitorData,
  GetCompetitorError,
  GetCompetitorParams,
  GetCompetitorsData,
  GetConversionRatesData,
  GetConversionRatesError,
  GetConversionRatesParams,
  GetDailyTrafficData,
  GetDailyTrafficError,
  GetDailyTrafficParams,
  GetDataSourceData,
  GetDataSourceError,
  GetDataSourceParams,
  GetDataSourcesData,
  GetFileUploadsData,
  GetFlowData,
  GetFlowError,
  GetFlowParams,
  GetFootTrafficDataData,
  GetFootTrafficDataError,
  GetFootTrafficDataParams,
  GetHeatmapDataData,
  GetHourlyTrafficData,
  GetHourlyTrafficError,
  GetHourlyTrafficParams,
  GetLangflowStatusData,
  GetLocationCompetitorsData,
  GetLocationCompetitorsError,
  GetLocationCompetitorsParams,
  GetLocationData,
  GetLocationError,
  GetLocationFootTrafficData,
  GetLocationFootTrafficError,
  GetLocationFootTrafficParams,
  GetLocationInsightsData,
  GetLocationInsightsError,
  GetLocationInsightsParams,
  GetLocationParams,
  GetLocationScoresData,
  GetLocationScoresError,
  GetLocationScoresParams,
  GetMenuAnalysisData,
  GetMenuAnalysisError,
  GetMenuAnalysisParams,
  GetMenuCategoriesData,
  GetMenuCategoriesError,
  GetMenuCategoriesParams,
  GetMenuItemData,
  GetMenuItemError,
  GetMenuItemParams,
  GetMenuItemsData,
  GetMenuItemsError,
  GetMenuItemsParams,
  GetMenuOptimizationData,
  GetMenuOptimizationError,
  GetMenuOptimizationParams,
  GetReportData,
  GetReportError,
  GetReportParams,
  GetReportTemplateData,
  GetReportTemplateError,
  GetReportTemplateParams,
  GetReportTemplatesData,
  GetReportTemplatesError,
  GetReportTemplatesParams,
  GetReportsData,
  GetReportsError,
  GetReportsParams,
  GetScheduledReportData,
  GetScheduledReportError,
  GetScheduledReportParams,
  GetScheduledReportsData,
  GetScheduledReportsError,
  GetScheduledReportsParams,
  GetTrafficSummaryData,
  GetTrafficSummaryError,
  GetTrafficSummaryParams,
  GetUserData,
  GetUserError,
  GetUserParams,
  GetVisitorTypesData,
  GetVisitorTypesError,
  GetVisitorTypesParams,
  ImportFlowData,
  ImportFlowError,
  ImportFlowPayload,
  ListComponentsData,
  ListFlowsData,
  ListUsersData,
  LoginData,
  LoginError,
  LoginPayload,
  RunFlowData,
  RunFlowError,
  RunFlowParams,
  RunFlowPayload,
  SendScheduledReportData,
  SendScheduledReportError,
  SendScheduledReportParams,
  SimulateMenuChangesData,
  SimulateMenuChangesError,
  SimulateMenuChangesParams,
  ToggleStarReportData,
  ToggleStarReportError,
  ToggleStarReportParams,
  UpdateFlowData,
  UpdateFlowError,
  UpdateFlowParams,
  UpdateFlowPayload,
  UpdateUserData,
  UpdateUserError,
  UpdateUserParams,
  UpdateUserPayload,
  UploadFileData,
  UploadFileError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get all data sources
   *
   * @tags data_integration, dbtn/module:data
   * @name get_data_sources
   * @summary Get Data Sources
   * @request GET:/routes/data_integration/sources
   */
  get_data_sources = (params: RequestParams = {}) =>
    this.request<GetDataSourcesData, any>({
      path: `/routes/data_integration/sources`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get a data source by ID
   *
   * @tags data_integration, dbtn/module:data
   * @name get_data_source
   * @summary Get Data Source
   * @request GET:/routes/data_integration/sources/{source_id}
   */
  get_data_source = ({ sourceId, ...query }: GetDataSourceParams, params: RequestParams = {}) =>
    this.request<GetDataSourceData, GetDataSourceError>({
      path: `/routes/data_integration/sources/${sourceId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Connect to a data source
   *
   * @tags data_integration, dbtn/module:data
   * @name connect_data_source
   * @summary Connect Data Source
   * @request POST:/routes/data_integration/sources/{source_id}/connect
   */
  connect_data_source = ({ sourceId, ...query }: ConnectDataSourceParams, params: RequestParams = {}) =>
    this.request<ConnectDataSourceData, ConnectDataSourceError>({
      path: `/routes/data_integration/sources/${sourceId}/connect`,
      method: "POST",
      ...params,
    });

  /**
   * @description Disconnect from a data source
   *
   * @tags data_integration, dbtn/module:data
   * @name disconnect_data_source
   * @summary Disconnect Data Source
   * @request POST:/routes/data_integration/sources/{source_id}/disconnect
   */
  disconnect_data_source = ({ sourceId, ...query }: DisconnectDataSourceParams, params: RequestParams = {}) =>
    this.request<DisconnectDataSourceData, DisconnectDataSourceError>({
      path: `/routes/data_integration/sources/${sourceId}/disconnect`,
      method: "POST",
      ...params,
    });

  /**
   * @description Upload a file
   *
   * @tags data_integration, dbtn/module:data
   * @name upload_file
   * @summary Upload File
   * @request POST:/routes/data_integration/upload
   */
  upload_file = (data: BodyUploadFile, params: RequestParams = {}) =>
    this.request<UploadFileData, UploadFileError>({
      path: `/routes/data_integration/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * @description Get all file uploads
   *
   * @tags data_integration, dbtn/module:data
   * @name get_file_uploads
   * @summary Get File Uploads
   * @request GET:/routes/data_integration/uploads
   */
  get_file_uploads = (params: RequestParams = {}) =>
    this.request<GetFileUploadsData, any>({
      path: `/routes/data_integration/uploads`,
      method: "GET",
      ...params,
    });

  /**
   * @description Check if Langflow is available
   *
   * @tags langflow, dbtn/module:langflow
   * @name get_langflow_status
   * @summary Get Langflow Status
   * @request GET:/routes/langflow/
   */
  get_langflow_status = (params: RequestParams = {}) =>
    this.request<GetLangflowStatusData, any>({
      path: `/routes/langflow/`,
      method: "GET",
      ...params,
    });

  /**
   * @description List all available flows
   *
   * @tags langflow, dbtn/module:langflow
   * @name list_flows
   * @summary List Flows
   * @request GET:/routes/langflow/flows
   */
  list_flows = (params: RequestParams = {}) =>
    this.request<ListFlowsData, any>({
      path: `/routes/langflow/flows`,
      method: "GET",
      ...params,
    });

  /**
   * @description Create a new flow
   *
   * @tags langflow, dbtn/module:langflow
   * @name create_flow
   * @summary Create Flow
   * @request POST:/routes/langflow/flows
   */
  create_flow = (data: CreateFlowPayload, params: RequestParams = {}) =>
    this.request<CreateFlowData, CreateFlowError>({
      path: `/routes/langflow/flows`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get a specific flow by ID
   *
   * @tags langflow, dbtn/module:langflow
   * @name get_flow
   * @summary Get Flow
   * @request GET:/routes/langflow/flows/{flow_id}
   */
  get_flow = ({ flowId, ...query }: GetFlowParams, params: RequestParams = {}) =>
    this.request<GetFlowData, GetFlowError>({
      path: `/routes/langflow/flows/${flowId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Update an existing flow
   *
   * @tags langflow, dbtn/module:langflow
   * @name update_flow
   * @summary Update Flow
   * @request PUT:/routes/langflow/flows/{flow_id}
   */
  update_flow = ({ flowId, ...query }: UpdateFlowParams, data: UpdateFlowPayload, params: RequestParams = {}) =>
    this.request<UpdateFlowData, UpdateFlowError>({
      path: `/routes/langflow/flows/${flowId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Delete a flow
   *
   * @tags langflow, dbtn/module:langflow
   * @name delete_flow
   * @summary Delete Flow
   * @request DELETE:/routes/langflow/flows/{flow_id}
   */
  delete_flow = ({ flowId, ...query }: DeleteFlowParams, params: RequestParams = {}) =>
    this.request<DeleteFlowData, DeleteFlowError>({
      path: `/routes/langflow/flows/${flowId}`,
      method: "DELETE",
      ...params,
    });

  /**
   * @description Run a specific flow with the provided inputs
   *
   * @tags langflow, dbtn/module:langflow
   * @name run_flow
   * @summary Run Flow
   * @request POST:/routes/langflow/flows/{flow_id}/run
   */
  run_flow = ({ flowId, ...query }: RunFlowParams, data: RunFlowPayload, params: RequestParams = {}) =>
    this.request<RunFlowData, RunFlowError>({
      path: `/routes/langflow/flows/${flowId}/run`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Import a flow from Langflow
   *
   * @tags langflow, dbtn/module:langflow
   * @name import_flow
   * @summary Import Flow
   * @request POST:/routes/langflow/flows/import
   */
  import_flow = (data: ImportFlowPayload, params: RequestParams = {}) =>
    this.request<ImportFlowData, ImportFlowError>({
      path: `/routes/langflow/flows/import`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description List all available Langflow components
   *
   * @tags langflow, dbtn/module:langflow
   * @name list_components
   * @summary List Components
   * @request GET:/routes/langflow/components
   */
  list_components = (params: RequestParams = {}) =>
    this.request<ListComponentsData, any>({
      path: `/routes/langflow/components`,
      method: "GET",
      ...params,
    });

  /**
   * @description List all users
   *
   * @tags users, dbtn/module:user
   * @name list_users
   * @summary List Users
   * @request GET:/routes/users/
   */
  list_users = (params: RequestParams = {}) =>
    this.request<ListUsersData, any>({
      path: `/routes/users/`,
      method: "GET",
      ...params,
    });

  /**
   * @description Create a new user
   *
   * @tags users, dbtn/module:user
   * @name create_user
   * @summary Create User
   * @request POST:/routes/users/
   */
  create_user = (data: CreateUserPayload, params: RequestParams = {}) =>
    this.request<CreateUserData, CreateUserError>({
      path: `/routes/users/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get a specific user by ID
   *
   * @tags users, dbtn/module:user
   * @name get_user
   * @summary Get User
   * @request GET:/routes/users/{user_id}
   */
  get_user = ({ userId, ...query }: GetUserParams, params: RequestParams = {}) =>
    this.request<GetUserData, GetUserError>({
      path: `/routes/users/${userId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Update an existing user
   *
   * @tags users, dbtn/module:user
   * @name update_user
   * @summary Update User
   * @request PUT:/routes/users/{user_id}
   */
  update_user = ({ userId, ...query }: UpdateUserParams, data: UpdateUserPayload, params: RequestParams = {}) =>
    this.request<UpdateUserData, UpdateUserError>({
      path: `/routes/users/${userId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Delete a user
   *
   * @tags users, dbtn/module:user
   * @name delete_user
   * @summary Delete User
   * @request DELETE:/routes/users/{user_id}
   */
  delete_user = ({ userId, ...query }: DeleteUserParams, params: RequestParams = {}) =>
    this.request<DeleteUserData, DeleteUserError>({
      path: `/routes/users/${userId}`,
      method: "DELETE",
      ...params,
    });

  /**
   * @description Login a user
   *
   * @tags users, dbtn/module:user
   * @name login
   * @summary Login
   * @request POST:/routes/users/login
   */
  login = (data: LoginPayload, params: RequestParams = {}) =>
    this.request<LoginData, LoginError>({
      path: `/routes/users/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get a list of reports with optional filtering
   *
   * @tags dbtn/module:report
   * @name get_reports
   * @summary Get Reports
   * @request GET:/routes/
   */
  get_reports = (query: GetReportsParams, params: RequestParams = {}) =>
    this.request<GetReportsData, GetReportsError>({
      path: `/routes/`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Create a new report
   *
   * @tags dbtn/module:report
   * @name create_report
   * @summary Create Report
   * @request POST:/routes/
   */
  create_report = (data: BodyCreateReport, params: RequestParams = {}) =>
    this.request<CreateReportData, CreateReportError>({
      path: `/routes/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get detailed information about a specific location
   *
   * @tags dbtn/module:location_analysis
   * @name get_location
   * @summary Get Location
   * @request GET:/routes/{location_id}
   */
  get_location = ({ locationId, ...query }: GetLocationParams, params: RequestParams = {}) =>
    this.request<GetLocationData, GetLocationError>({
      path: `/routes/${locationId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get detailed score breakdown for a location
   *
   * @tags dbtn/module:location_analysis
   * @name get_location_scores
   * @summary Get Location Scores
   * @request GET:/routes/{location_id}/scores
   */
  get_location_scores = ({ locationId, ...query }: GetLocationScoresParams, params: RequestParams = {}) =>
    this.request<GetLocationScoresData, GetLocationScoresError>({
      path: `/routes/${locationId}/scores`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get foot traffic patterns for a location with optional time filtering
   *
   * @tags dbtn/module:location_analysis
   * @name get_location_foot_traffic
   * @summary Get Location Foot Traffic
   * @request GET:/routes/{location_id}/foot-traffic
   */
  get_location_foot_traffic = ({ locationId, ...query }: GetLocationFootTrafficParams, params: RequestParams = {}) =>
    this.request<GetLocationFootTrafficData, GetLocationFootTrafficError>({
      path: `/routes/${locationId}/foot-traffic`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get competitors near a specified location with optional filtering
   *
   * @tags dbtn/module:location_analysis
   * @name get_location_competitors
   * @summary Get Location Competitors
   * @request GET:/routes/{location_id}/competitors
   */
  get_location_competitors = ({ locationId, ...query }: GetLocationCompetitorsParams, params: RequestParams = {}) =>
    this.request<GetLocationCompetitorsData, GetLocationCompetitorsError>({
      path: `/routes/${locationId}/competitors`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get analytical insights for a location with optional filtering
   *
   * @tags dbtn/module:location_analysis
   * @name get_location_insights
   * @summary Get Location Insights
   * @request GET:/routes/{location_id}/insights
   */
  get_location_insights = ({ locationId, ...query }: GetLocationInsightsParams, params: RequestParams = {}) =>
    this.request<GetLocationInsightsData, GetLocationInsightsError>({
      path: `/routes/${locationId}/insights`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get the list of menu items with performance data.
   *
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_items
   * @summary Get Menu Items
   * @request GET:/routes/menu-optimization/menu-items
   */
  get_menu_items = (query: GetMenuItemsParams, params: RequestParams = {}) =>
    this.request<GetMenuItemsData, GetMenuItemsError>({
      path: `/routes/menu-optimization/menu-items`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get detailed information about a specific menu item.
   *
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_item
   * @summary Get Menu Item
   * @request GET:/routes/menu-optimization/menu-items/{item_id}
   */
  get_menu_item = ({ itemId, ...query }: GetMenuItemParams, params: RequestParams = {}) =>
    this.request<GetMenuItemData, GetMenuItemError>({
      path: `/routes/menu-optimization/menu-items/${itemId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get menu categories with performance data.
   *
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_categories
   * @summary Get Menu Categories
   * @request GET:/routes/menu-optimization/categories
   */
  get_menu_categories = (query: GetMenuCategoriesParams, params: RequestParams = {}) =>
    this.request<GetMenuCategoriesData, GetMenuCategoriesError>({
      path: `/routes/menu-optimization/categories`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get comprehensive menu analysis with performance metrics and recommendations.
   *
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_analysis
   * @summary Get Menu Analysis
   * @request GET:/routes/menu-optimization/analysis
   */
  get_menu_analysis = (query: GetMenuAnalysisParams, params: RequestParams = {}) =>
    this.request<GetMenuAnalysisData, GetMenuAnalysisError>({
      path: `/routes/menu-optimization/analysis`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get menu optimization recommendations based on performance data.
   *
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name get_menu_optimization
   * @summary Get Menu Optimization
   * @request GET:/routes/menu-optimization/optimization
   */
  get_menu_optimization = (query: GetMenuOptimizationParams, params: RequestParams = {}) =>
    this.request<GetMenuOptimizationData, GetMenuOptimizationError>({
      path: `/routes/menu-optimization/optimization`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Simulate the impact of menu changes (adding/removing items, price adjustments).
   *
   * @tags menu-optimization, dbtn/module:menu_optimization
   * @name simulate_menu_changes
   * @summary Simulate Menu Changes
   * @request POST:/routes/menu-optimization/simulate
   */
  simulate_menu_changes = (
    query: SimulateMenuChangesParams,
    data: BodySimulateMenuChanges,
    params: RequestParams = {},
  ) =>
    this.request<SimulateMenuChangesData, SimulateMenuChangesError>({
      path: `/routes/menu-optimization/simulate`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get detailed information about a specific report
   *
   * @tags dbtn/module:report
   * @name get_report
   * @summary Get Report
   * @request GET:/routes/{report_id}
   */
  get_report = ({ reportId, ...query }: GetReportParams, params: RequestParams = {}) =>
    this.request<GetReportData, GetReportError>({
      path: `/routes/${reportId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Delete a report
   *
   * @tags dbtn/module:report
   * @name delete_report
   * @summary Delete Report
   * @request DELETE:/routes/{report_id}
   */
  delete_report = ({ reportId, ...query }: DeleteReportParams, params: RequestParams = {}) =>
    this.request<DeleteReportData, DeleteReportError>({
      path: `/routes/${reportId}`,
      method: "DELETE",
      ...params,
    });

  /**
   * @description Toggle the starred status of a report
   *
   * @tags dbtn/module:report
   * @name toggle_star_report
   * @summary Toggle Star Report
   * @request PUT:/routes/{report_id}/star
   */
  toggle_star_report = ({ reportId, ...query }: ToggleStarReportParams, params: RequestParams = {}) =>
    this.request<ToggleStarReportData, ToggleStarReportError>({
      path: `/routes/${reportId}/star`,
      method: "PUT",
      ...params,
    });

  /**
   * @description Get a list of report templates with optional filtering
   *
   * @tags dbtn/module:report
   * @name get_report_templates
   * @summary Get Report Templates
   * @request GET:/routes/templates/
   */
  get_report_templates = (query: GetReportTemplatesParams, params: RequestParams = {}) =>
    this.request<GetReportTemplatesData, GetReportTemplatesError>({
      path: `/routes/templates/`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get detailed information about a specific report template
   *
   * @tags dbtn/module:report
   * @name get_report_template
   * @summary Get Report Template
   * @request GET:/routes/templates/{template_id}
   */
  get_report_template = ({ templateId, ...query }: GetReportTemplateParams, params: RequestParams = {}) =>
    this.request<GetReportTemplateData, GetReportTemplateError>({
      path: `/routes/templates/${templateId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get a list of scheduled reports with optional filtering
   *
   * @tags dbtn/module:report
   * @name get_scheduled_reports
   * @summary Get Scheduled Reports
   * @request GET:/routes/scheduled/
   */
  get_scheduled_reports = (query: GetScheduledReportsParams, params: RequestParams = {}) =>
    this.request<GetScheduledReportsData, GetScheduledReportsError>({
      path: `/routes/scheduled/`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Create a new scheduled report
   *
   * @tags dbtn/module:report
   * @name create_scheduled_report
   * @summary Create Scheduled Report
   * @request POST:/routes/scheduled/
   */
  create_scheduled_report = (data: BodyCreateScheduledReport, params: RequestParams = {}) =>
    this.request<CreateScheduledReportData, CreateScheduledReportError>({
      path: `/routes/scheduled/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get detailed information about a specific scheduled report
   *
   * @tags dbtn/module:report
   * @name get_scheduled_report
   * @summary Get Scheduled Report
   * @request GET:/routes/scheduled/{schedule_id}
   */
  get_scheduled_report = ({ scheduleId, ...query }: GetScheduledReportParams, params: RequestParams = {}) =>
    this.request<GetScheduledReportData, GetScheduledReportError>({
      path: `/routes/scheduled/${scheduleId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Send a scheduled report immediately (simulation)
   *
   * @tags dbtn/module:report
   * @name send_scheduled_report
   * @summary Send Scheduled Report
   * @request PUT:/routes/scheduled/{schedule_id}/send
   */
  send_scheduled_report = ({ scheduleId, ...query }: SendScheduledReportParams, params: RequestParams = {}) =>
    this.request<SendScheduledReportData, SendScheduledReportError>({
      path: `/routes/scheduled/${scheduleId}/send`,
      method: "PUT",
      ...params,
    });

  /**
   * @description Get foot traffic data for the specified date range
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_foot_traffic_data
   * @summary Get Foot Traffic Data
   * @request GET:/routes/foot_traffic/
   */
  get_foot_traffic_data = (query: GetFootTrafficDataParams, params: RequestParams = {}) =>
    this.request<GetFootTrafficDataData, GetFootTrafficDataError>({
      path: `/routes/foot_traffic/`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get traffic summary for the specified date range
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_traffic_summary
   * @summary Get Traffic Summary
   * @request GET:/routes/foot_traffic/summary
   */
  get_traffic_summary = (query: GetTrafficSummaryParams, params: RequestParams = {}) =>
    this.request<GetTrafficSummaryData, GetTrafficSummaryError>({
      path: `/routes/foot_traffic/summary`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get hourly traffic data for the specified date range
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_hourly_traffic
   * @summary Get Hourly Traffic
   * @request GET:/routes/foot_traffic/hourly
   */
  get_hourly_traffic = (query: GetHourlyTrafficParams, params: RequestParams = {}) =>
    this.request<GetHourlyTrafficData, GetHourlyTrafficError>({
      path: `/routes/foot_traffic/hourly`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get daily traffic data for the specified date range
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_daily_traffic
   * @summary Get Daily Traffic
   * @request GET:/routes/foot_traffic/daily
   */
  get_daily_traffic = (query: GetDailyTrafficParams, params: RequestParams = {}) =>
    this.request<GetDailyTrafficData, GetDailyTrafficError>({
      path: `/routes/foot_traffic/daily`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get visitor type distribution for the specified date range
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_visitor_types
   * @summary Get Visitor Types
   * @request GET:/routes/foot_traffic/visitor-types
   */
  get_visitor_types = (query: GetVisitorTypesParams, params: RequestParams = {}) =>
    this.request<GetVisitorTypesData, GetVisitorTypesError>({
      path: `/routes/foot_traffic/visitor-types`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get conversion rates for the specified date range
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_conversion_rates
   * @summary Get Conversion Rates
   * @request GET:/routes/foot_traffic/conversion-rates
   */
  get_conversion_rates = (query: GetConversionRatesParams, params: RequestParams = {}) =>
    this.request<GetConversionRatesData, GetConversionRatesError>({
      path: `/routes/foot_traffic/conversion-rates`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Get store traffic heatmap data
   *
   * @tags foot_traffic, dbtn/module:foot_traffic
   * @name get_heatmap_data
   * @summary Get Heatmap Data
   * @request GET:/routes/foot_traffic/heatmap
   */
  get_heatmap_data = (params: RequestParams = {}) =>
    this.request<GetHeatmapDataData, any>({
      path: `/routes/foot_traffic/heatmap`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get all competitors
   *
   * @tags competitors, dbtn/module:compettitor
   * @name get_competitors
   * @summary Get Competitors
   * @request GET:/routes/competitors/
   */
  get_competitors = (params: RequestParams = {}) =>
    this.request<GetCompetitorsData, any>({
      path: `/routes/competitors/`,
      method: "GET",
      ...params,
    });

  /**
   * @description Create a new competitor
   *
   * @tags competitors, dbtn/module:compettitor
   * @name create_competitor
   * @summary Create Competitor
   * @request POST:/routes/competitors/
   */
  create_competitor = (data: CompetitorCreate, params: RequestParams = {}) =>
    this.request<CreateCompetitorData, CreateCompetitorError>({
      path: `/routes/competitors/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get a competitor by ID
   *
   * @tags competitors, dbtn/module:compettitor
   * @name get_competitor
   * @summary Get Competitor
   * @request GET:/routes/competitors/{competitor_id}
   */
  get_competitor = ({ competitorId, ...query }: GetCompetitorParams, params: RequestParams = {}) =>
    this.request<GetCompetitorData, GetCompetitorError>({
      path: `/routes/competitors/${competitorId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Get all unique competitor categories
   *
   * @tags competitors, dbtn/module:compettitor
   * @name get_categories
   * @summary Get Categories
   * @request GET:/routes/competitors/categories
   */
  get_categories = (params: RequestParams = {}) =>
    this.request<GetCategoriesData, any>({
      path: `/routes/competitors/categories`,
      method: "GET",
      ...params,
    });
}
