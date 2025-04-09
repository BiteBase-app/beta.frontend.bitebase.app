import React, { useState } from "react";
import { DashboardLayout } from "components/DashboardLayout";

export default function Demographics() {
  const [activeTab, setActiveTab] = useState<"overview" | "age" | "income" | "interests">("overview");
  
  // Sample demographic data
  const demographicData = {
    overview: {
      totalCustomers: 12450,
      malePercentage: 48,
      femalePercentage: 52,
      averageAge: 34,
      topZipCodes: ["90210", "90001", "90077", "90095", "90024"],
      customerGrowth: "+12%"
    },
    ageGroups: [
      { group: "18-24", percentage: 15, count: 1868 },
      { group: "25-34", percentage: 32, count: 3984 },
      { group: "35-44", percentage: 28, count: 3486 },
      { group: "45-54", percentage: 14, count: 1743 },
      { group: "55-64", percentage: 8, count: 996 },
      { group: "65+", percentage: 3, count: 373 }
    ],
    incomeGroups: [
      { group: "Under $25k", percentage: 8, count: 996 },
      { group: "25k-50k", percentage: 22, count: 2739 },
      { group: "50k-75k", percentage: 35, count: 4358 },
      { group: "75k-100k", percentage: 20, count: 2490 },
      { group: "100k-150k", percentage: 10, count: 1245 },
      { group: "150k+", percentage: 5, count: 622 }
    ],
    interests: [
      { category: "Healthy Eating", percentage: 68, count: 8466 },
      { category: "Fitness", percentage: 52, count: 6474 },
      { category: "Travel", percentage: 47, count: 5852 },
      { category: "Technology", percentage: 45, count: 5603 },
      { category: "Outdoor Activities", percentage: 42, count: 5229 },
      { category: "Arts & Culture", percentage: 38, count: 4731 },
      { category: "Family Activities", percentage: 35, count: 4358 },
      { category: "Cooking", percentage: 32, count: 3984 }
    ]
  };
  
  // Render progress bar
  const renderProgressBar = (percentage: number, color: string = "primary") => {
    return (
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`bg-${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Customer Demographics</h1>
              <p className="text-muted-foreground">Understand your customer base with detailed demographic insights</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Export Report</span>
              </button>
              <button className="px-4 py-2 bg-card text-foreground border border-border rounded-lg flex items-center space-x-2 hover:bg-muted transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Filter Data</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'age' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('age')}
          >
            Age Distribution
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'income' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('income')}
          >
            Income Levels
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'interests' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('interests')}
          >
            Interests & Preferences
          </button>
        </div>
        
        {/* Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Customers</h3>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold">{demographicData.overview.totalCustomers.toLocaleString()}</p>
                    <span className="ml-2 text-sm font-medium text-green-500">{demographicData.overview.customerGrowth}</span>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Gender Distribution</h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xl font-bold">{demographicData.overview.malePercentage}%</p>
                      <p className="text-xs text-muted-foreground">Male</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">{demographicData.overview.femalePercentage}%</p>
                      <p className="text-xs text-muted-foreground">Female</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Age</h3>
                  <p className="text-3xl font-bold">{demographicData.overview.averageAge}</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Zip Code</h3>
                  <p className="text-3xl font-bold">{demographicData.overview.topZipCodes[0]}</p>
                </div>
              </div>
              
              {/* Gender Distribution Chart */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Gender Distribution</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-32 rounded-full border-8 border-primary relative flex items-center justify-center">
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-muted" 
                      style={{ 
                        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                        opacity: 0.3
                      }}
                    ></div>
                    <span className="text-xl font-bold">{demographicData.overview.malePercentage}%</span>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      <span className="text-sm">Male ({demographicData.overview.malePercentage}%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-muted rounded-full mr-2"></span>
                      <span className="text-sm">Female ({demographicData.overview.femalePercentage}%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Top Zip Codes */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Top Zip Codes</h3>
                <div className="space-y-4">
                  {demographicData.overview.topZipCodes.map((zipCode, index) => (
                    <div key={zipCode} className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium">{zipCode}</span>
                      <div className="ml-4 flex-1">
                        {renderProgressBar(100 - index * 15)}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">{100 - index * 15}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Age Distribution Tab */}
          {activeTab === 'age' && (
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Age Distribution</h3>
                <div className="space-y-4">
                  {demographicData.ageGroups.map((group) => (
                    <div key={group.group} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{group.group}</span>
                        <span className="text-sm text-muted-foreground">{group.count.toLocaleString()} customers</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          {renderProgressBar(group.percentage)}
                        </div>
                        <span className="ml-2 text-sm font-medium">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Age Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Largest Age Group</h4>
                    <p className="text-2xl font-bold">25-34</p>
                    <p className="text-sm text-muted-foreground">32% of customers</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Average Age</h4>
                    <p className="text-2xl font-bold">34</p>
                    <p className="text-sm text-muted-foreground">Years old</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Fastest Growing</h4>
                    <p className="text-2xl font-bold">18-24</p>
                    <p className="text-sm text-muted-foreground">+18% year over year</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Age Distribution Chart</h3>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Age distribution chart would be displayed here</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Income Levels Tab */}
          {activeTab === 'income' && (
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Income Distribution</h3>
                <div className="space-y-4">
                  {demographicData.incomeGroups.map((group) => (
                    <div key={group.group} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{group.group}</span>
                        <span className="text-sm text-muted-foreground">{group.count.toLocaleString()} customers</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          {renderProgressBar(group.percentage)}
                        </div>
                        <span className="ml-2 text-sm font-medium">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Income Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Largest Income Group</h4>
                    <p className="text-2xl font-bold">$50k-75k</p>
                    <p className="text-sm text-muted-foreground">35% of customers</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Average Income</h4>
                    <p className="text-2xl font-bold">$68,500</p>
                    <p className="text-sm text-muted-foreground">Per year</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">High Income</h4>
                    <p className="text-2xl font-bold">15%</p>
                    <p className="text-sm text-muted-foreground">Earn over $100k</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Spending Patterns</h3>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Spending patterns chart would be displayed here</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Interests Tab */}
          {activeTab === 'interests' && (
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">Customer Interests</h3>
                <div className="space-y-4">
                  {demographicData.interests.map((interest) => (
                    <div key={interest.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{interest.category}</span>
                        <span className="text-sm text-muted-foreground">{interest.count.toLocaleString()} customers</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          {renderProgressBar(interest.percentage)}
                        </div>
                        <span className="ml-2 text-sm font-medium">{interest.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">Dining Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Healthy Options</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    {renderProgressBar(72)}
                    
                    <div className="flex justify-between items-center">
                      <span>Vegetarian/Vegan</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    {renderProgressBar(45)}
                    
                    <div className="flex justify-between items-center">
                      <span>Gluten-Free</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    {renderProgressBar(28)}
                    
                    <div className="flex justify-between items-center">
                      <span>Organic</span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    {renderProgressBar(62)}
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">Social Media Usage</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Instagram</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    {renderProgressBar(85)}
                    
                    <div className="flex justify-between items-center">
                      <span>Facebook</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    {renderProgressBar(68)}
                    
                    <div className="flex justify-between items-center">
                      <span>TikTok</span>
                      <span className="text-sm font-medium">52%</span>
                    </div>
                    {renderProgressBar(52)}
                    
                    <div className="flex justify-between items-center">
                      <span>Twitter</span>
                      <span className="text-sm font-medium">38%</span>
                    </div>
                    {renderProgressBar(38)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
