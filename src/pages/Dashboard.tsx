import React, { useState, useEffect } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { MetricCard } from "components/MetricCard";
import { LangflowWidget } from '../components/LangflowIntegration';
import Chart from "react-apexcharts";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'recommendations'>('overview');

  // Example metrics for the dashboard
  const metrics = [
    {
      title: "Total Markets Analyzed",
      value: "12",
      change: "2",
      isPositive: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 7V20L8 17L3 20V7L8 4L15 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 7L21 4V17L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Competitors Tracked",
      value: "48",
      change: "5",
      isPositive: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Demographic Insights",
      value: "24",
      change: "3",
      isPositive: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21H3V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 14L12 9L16 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Saved Reports",
      value: "7",
      change: "1",
      isPositive: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // Sample recent activity data
  const recentActivity = [
    { id: 1, action: "New analysis completed", location: "Downtown, San Francisco", time: "2 hours ago" },
    { id: 2, action: "Competitive report generated", location: "North Beach, Chicago", time: "Yesterday" },
    { id: 3, action: "Demographic insights updated", location: "Midtown, New York", time: "2 days ago" },
    { id: 4, action: "New AI model trained", location: "All locations", time: "3 days ago" },
  ];

  // AI-generated insights
  const insights = [
    "Your customer traffic has increased by 15% in Downtown locations compared to last month.",
    "Competitors in the North Beach area have decreased their menu prices by an average of 7%.",
    "Customer retention rate has improved by 12% after implementing the recommended loyalty program.",
    "The most profitable menu item category is now 'Signature Dishes' with a 28% profit margin.",
    "Evening hours (7-9 PM) show the highest customer engagement and per-visit spending.",
    "Social media mentions have increased 42% since your last marketing campaign."
  ];

  // AI-generated recommendations
  const recommendations = [
    {
      title: "Menu Optimization",
      description: "Consider adding more vegetarian options to increase appeal to younger demographic segments.",
      impact: "High",
      effort: "Medium"
    },
    {
      title: "Pricing Strategy",
      description: "Implement dynamic pricing during peak hours to maximize revenue.",
      impact: "High", 
      effort: "Low"
    },
    {
      title: "Staffing Adjustment",
      description: "Increase staff during Thursday evenings when customer traffic is highest.",
      impact: "Medium",
      effort: "Medium"
    },
    {
      title: "Competitor Response",
      description: "Match the new promotion from Bistro Rival in the Downtown area.",
      impact: "Medium",
      effort: "Low"
    }
  ];

  // Chart data for sales performance
  const salesChartOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      fontFamily: 'inherit'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    tooltip: {
      theme: 'dark'
    },
    colors: ['#3b82f6', '#10b981'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.1
      }
    }
  };

  const salesChartSeries = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    },
    {
      name: 'Profit',
      data: [10, 15, 12, 20, 18, 26, 28, 40, 55]
    }
  ];

  // Chart data for customer demographics
  const demographicsChartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit'
    },
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const demographicsChartSeries = [25, 40, 20, 10, 5];

  // Simulate loading of AI insights
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setAiInsights(insights);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header with Day Summary */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to BiteBase Intelligence</h1>
              <p className="text-muted-foreground">Your AI-powered restaurant market analytics dashboard</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-primary rounded-full p-2 text-primary-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Today's Forecast</p>
                <p className="text-lg font-bold">Revenue +12% vs. Last Week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                isPositive={metric.isPositive}
                icon={metric.icon}
              />
            ))}
          </div>
        </div>

        {/* Tabs for Data Views */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="border-b border-border">
            <div className="flex">
              <button 
                className={`px-6 py-3 font-medium text-sm ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm ${activeTab === 'insights' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('insights')}
              >
                AI Insights
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm ${activeTab === 'recommendations' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('recommendations')}
              >
                Recommendations
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Performance Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
                  <div className="h-80">
                    <Chart
                      options={salesChartOptions}
                      series={salesChartSeries}
                      type="area"
                      height="100%"
                    />
                  </div>
                </div>
                
                {/* Customer Demographics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Demographics</h3>
                  <div className="h-80">
                    <Chart
                      options={demographicsChartOptions}
                      series={demographicsChartSeries}
                      type="donut"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* AI Insights Tab */}
            {activeTab === 'insights' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">AI-Generated Insights</h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiInsights.map((insight, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-muted/30 border border-border rounded-lg"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 text-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <p>{insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Strategic Recommendations</h3>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-muted/30 border border-border rounded-lg"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{rec.title}</h4>
                          <p className="text-muted-foreground">{rec.description}</p>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div>
                            <span className="block text-xs text-muted-foreground mb-1">Impact</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              rec.impact === 'High' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {rec.impact}
                            </span>
                          </div>
                          <div>
                            <span className="block text-xs text-muted-foreground mb-1">Effort</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              rec.effort === 'Low' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {rec.effort}
                            </span>
                          </div>
                          <button className="ml-4 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
                            Implement
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center bg-card hover:bg-muted transition-colors p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-medium">New Analysis</span>
            </button>

            <button className="flex flex-col items-center justify-center bg-card hover:bg-muted transition-colors p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M15 7V20L8 17L3 20V7L8 4L15 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 7L21 4V17L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-medium">View Map</span>
            </button>

            <button className="flex flex-col items-center justify-center bg-card hover:bg-muted transition-colors p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-medium">Competitor Analysis</span>
            </button>

            <button className="flex flex-col items-center justify-center bg-card hover:bg-muted transition-colors p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-medium">Generate Report</span>
            </button>
          </div>
        </div>

        {/* Recent Activity and AI Assistant */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <ul className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="p-4 hover:bg-muted transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.location}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-border">
                <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div>
            <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
            <LangflowWidget
              title="Business Intelligence Assistant"
              description="Ask me about your business data"
              inputPlaceholder="What insights can you provide about our sales trends?"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
