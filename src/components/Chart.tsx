import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/utils/cn";

// Define chart configuration types
export interface ChartConfig {
  /** X-axis key in data */
  xAxisKey?: string;
  /** Whether to show the grid */
  showGrid?: boolean;
  /** Whether to show the legend */
  showLegend?: boolean;
  /** Whether to show tooltips */
  showTooltip?: boolean;
  /** Chart colors */
  colors?: string[];
  /** Additional configuration for specific chart types */
  [key: string]: any;
}

// Define data series for line, bar, and area charts
export interface DataSeries {
  /** Data key in the dataset */
  dataKey: string;
  /** Display name */
  name?: string;
  /** Series color */
  color?: string;
  /** Optional styling */
  style?: any;
}

// Chart component props
export interface Props {
  /** Chart type */
  type: "line" | "bar" | "pie" | "area";
  /** Chart data */
  data: any[];
  /** Chart configuration */
  config?: ChartConfig;
  /** Data series for line, bar, and area charts */
  series?: DataSeries[];
  /** Chart height */
  height?: number;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * Chart component for various data visualizations
 * Uses recharts for rendering different chart types
 */
export const Chart = ({
  type,
  data,
  config = {},
  series = [],
  height = 300,
  title,
  subtitle,
  className = "",
}: Props) => {
  // Default config values
  const {
    xAxisKey = "name",
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    colors = ["#74C365", "#E23D28", "#F4C431", "#64748B", "#6B7280", "#9CA3AF"],
    ...restConfig
  } = config;

  // Default pie chart config
  const pieConfig = {
    dataKey: "value",
    nameKey: "name",
    innerRadius: 0,
    outerRadius: "80%",
    ...restConfig,
  };

  // Generate a chart based on type
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.map((item, index) => (
              <Line
                key={item.dataKey}
                type="monotone"
                dataKey={item.dataKey}
                name={item.name || item.dataKey}
                stroke={item.color || colors[index % colors.length]}
                {...item.style}
              />
            ))}
          </LineChart>
        );

      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.map((item, index) => (
              <Bar
                key={item.dataKey}
                dataKey={item.dataKey}
                name={item.name || item.dataKey}
                fill={item.color || colors[index % colors.length]}
                {...item.style}
              />
            ))}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {series.map((item, index) => (
              <Area
                key={item.dataKey}
                type="monotone"
                dataKey={item.dataKey}
                name={item.name || item.dataKey}
                fill={item.color || colors[index % colors.length]}
                stroke={item.color || colors[index % colors.length]}
                {...item.style}
              />
            ))}
          </AreaChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={pieConfig.dataKey}
              nameKey={pieConfig.nameKey}
              innerRadius={pieConfig.innerRadius}
              outerRadius={pieConfig.outerRadius}
              {...restConfig}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className={cn("font-mono", className)}>
      {/* Chart header with title and subtitle if provided */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {/* Responsive chart container */}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
