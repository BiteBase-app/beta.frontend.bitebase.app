import React, { useState } from "react";
import { DashboardLayout } from "components/DashboardLayout";

interface DataSource {
  id: string;
  name: string;
  type: string;
  icon: string;
  status: "connected" | "disconnected";
  lastSync?: string;
}

export default function DataIntegration() {
  const [activeTab, setActiveTab] = useState<"sources" | "uploads">("sources");
  const [dragActive, setDragActive] = useState(false);
  
  // Sample data sources
  const dataSources: DataSource[] = [
    {
      id: "1",
      name: "POS System",
      type: "integration",
      icon: "cash-register",
      status: "connected",
      lastSync: "Today, 11:15 AM"
    },
    {
      id: "2",
      name: "Reservation System",
      type: "integration",
      icon: "calendar-check",
      status: "connected",
      lastSync: "Today, 10:30 AM"
    },
    {
      id: "3",
      name: "Delivery Platform",
      type: "integration",
      icon: "truck",
      status: "connected",
      lastSync: "Yesterday, 5:45 PM"
    },
    {
      id: "4",
      name: "Customer Feedback",
      type: "integration",
      icon: "comment-dots",
      status: "disconnected"
    },
    {
      id: "5",
      name: "Excel",
      type: "file",
      icon: "file-excel",
      status: "disconnected"
    },
    {
      id: "6",
      name: "CSV",
      type: "file",
      icon: "file-csv",
      status: "disconnected"
    },
    {
      id: "7",
      name: "Google Sheets",
      type: "file",
      icon: "table",
      status: "disconnected"
    }
  ];
  
  // Filter data sources by type
  const integrations = dataSources.filter(source => source.type === "integration");
  const fileTypes = dataSources.filter(source => source.type === "file");
  
  // Count connected sources
  const connectedCount = dataSources.filter(source => source.status === "connected").length;
  
  // Handle file drop
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Handle the files
      console.log("Files dropped:", e.dataTransfer.files);
      // In a real app, you would upload these files to your server
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Handle the files
      console.log("Files selected:", e.target.files);
      // In a real app, you would upload these files to your server
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-card rounded-xl shadow p-6 border border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Data Sources</h1>
              <div className="flex items-center mt-2">
                <span className={`w-2 h-2 rounded-full ${connectedCount > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
                <span className="text-sm font-medium">{connectedCount} active connections</span>
              </div>
              {connectedCount > 0 && (
                <p className="text-sm text-muted-foreground mt-1">Last sync: Today, 11:15 AM</p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Upload Data</span>
              </button>
              {connectedCount > 0 && (
                <button className="px-4 py-2 bg-card text-foreground border border-border rounded-lg flex items-center space-x-2 hover:bg-muted transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.51 9.00001C4.01717 7.56455 4.87913 6.2854 6.01547 5.27543C7.1518 4.26547 8.52547 3.55978 10.0083 3.22427C11.4911 2.88877 13.0348 2.93436 14.4952 3.35679C15.9556 3.77922 17.2853 4.56473 18.36 5.64001L23 10M1 14L5.64 18.36C6.71475 19.4353 8.04437 20.2208 9.50481 20.6432C10.9652 21.0657 12.5089 21.1113 13.9917 20.7758C15.4745 20.4402 16.8482 19.7346 17.9845 18.7246C19.1209 17.7146 19.9828 16.4355 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Sync All</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'sources' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('sources')}
          >
            Data Sources
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'uploads' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('uploads')}
          >
            File Uploads
          </button>
        </div>
        
        {/* Content */}
        {activeTab === 'sources' ? (
          <div className="space-y-8">
            {/* Integrations */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map(source => (
                  <div 
                    key={source.id}
                    className={`bg-card border ${source.status === 'connected' ? 'border-primary/50' : 'border-border'} rounded-lg p-4 flex items-center cursor-pointer hover:border-primary transition-all`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${source.status === 'connected' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} flex items-center justify-center mr-3`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="none" />
                        <path d="M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold">{source.name}</h4>
                        {source.status === 'connected' && (
                          <span className="ml-2 w-2 h-2 rounded-full bg-green-500"></span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {source.status === 'connected' 
                          ? `Last sync: ${source.lastSync}` 
                          : 'Not connected'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Files & Spreadsheets */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Files & Spreadsheets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fileTypes.map(source => (
                  <div 
                    key={source.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center cursor-pointer hover:border-primary transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted text-muted-foreground flex items-center justify-center mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">{source.name}</h4>
                      <p className="text-xs text-muted-foreground">{source.name} files</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-primary bg-primary/5' : 'border-border'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                id="fileInput" 
                className="hidden" 
                multiple 
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground mb-4">
                  <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">Drag & Drop Files Here</h3>
                <p className="text-muted-foreground mb-4">or</p>
                <button 
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  Browse Files
                </button>
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: CSV, Excel, JSON
                </p>
              </div>
            </div>
            
            {/* Recent Uploads */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-8 text-center text-muted-foreground">
                  <p>No recent uploads found</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
