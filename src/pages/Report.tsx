import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/extensions/shadcn/components';
import { Typography } from '@/extensions/shadcn/components/typography';

// Placeholder for SidebarLayout until it's fixed
const SidebarLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen">
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r p-4">
      <h1 className="text-xl font-semibold mb-6">BiteBase Intelligence</h1>
      <nav className="space-y-1">
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Reports</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Locations</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Menu</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Team</a>
      </nav>
    </div>
    <div className="ml-64 w-full">
      {children}
    </div>
  </div>
);

// Simplified version of lucide icons
const Icon = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-block w-4 h-4">{children}</span>
);

const Calendar = (props: any) => <Icon {...props}>📅</Icon>;
const Download = (props: any) => <Icon {...props}>↓</Icon>;
const FileText = (props: any) => <Icon {...props}>📄</Icon>;
const Filter = (props: any) => <Icon {...props}>🔍</Icon>;
const Mail = (props: any) => <Icon {...props}>✉️</Icon>;
const MoreHorizontal = (props: any) => <Icon {...props}>⋯</Icon>;
const Printer = (props: any) => <Icon {...props}>🖨️</Icon>;
const Share2 = (props: any) => <Icon {...props}>🔗</Icon>;
const Star = (props: any) => <Icon {...props}>⭐</Icon>;
const Trash2 = (props: any) => <Icon {...props}>🗑️</Icon>;
const TrendingUp = (props: any) => <Icon {...props}>📈</Icon>;

// Simple utility function to replace the cn utility
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Reports: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('saved');
  const [selectedReport, setSelectedReport] = useState('sales-report');
  
  // Simple placeholder data
  const reports = [
    { 
      id: 'sales-report', 
      name: 'Monthly Sales Performance', 
      description: 'Comprehensive analysis of sales with trend comparison',
      type: 'Financial',
      date: '2023-10-15',
      starred: true
    },
    { 
      id: 'foot-traffic', 
      name: 'Customer Traffic Analysis', 
      description: 'Foot traffic patterns and peak hours',
      type: 'Analytics',
      date: '2023-10-12',
      starred: true
    }
  ];
  
  const reportTemplates = [
    { 
      id: 'sales-template', 
      name: 'Sales Performance Report', 
      description: 'Daily, weekly, or monthly sales analysis',
      category: 'Financial',
      popularity: 'High'
    }
  ];
  
  const schedules = [
    { 
      id: 'weekly-sales', 
      name: 'Weekly Sales Summary', 
      frequency: 'Weekly',
      day: 'Monday',
      recipients: 'Management Team',
      lastSent: '2023-10-09'
    }
  ];
  
  // Simplified components
  const ReportCard = ({ report }: { report: any }) => (
    <div className="p-4 border rounded-lg">
      <h3>{report.name}</h3>
      <p>{report.description}</p>
      <div className="flex justify-between">
        <span>{report.type}</span>
        <span>{report.date}</span>
      </div>
    </div>
  );

  const TemplateCard = ({ template }: { template: any }) => (
    <div className="p-4 border rounded-lg">
      <h3>{template.name}</h3>
      <p>{template.description}</p>
      <div className="flex justify-between">
        <span>{template.category}</span>
        <span>{template.popularity}</span>
      </div>
    </div>
  );
  
  const ScheduleRow = ({ schedule }: { schedule: any }) => (
    <div className="p-4 border-b">
      <h3>{schedule.name}</h3>
      <p>{schedule.frequency} ({schedule.day})</p>
      <p>Recipients: {schedule.recipients}</p>
      <p>Last sent: {schedule.lastSent}</p>
    </div>
  );
  
  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <Button>New Report</Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="saved">
                    {reports.map(report => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="templates">
                    {reportTemplates.map(template => (
                      <TemplateCard key={template.id} template={template} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="scheduled">
                    {schedules.map(schedule => (
                      <ScheduleRow key={schedule.id} schedule={schedule} />
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Select a report to view details</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Reports; 