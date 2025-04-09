import React, { useState, useEffect } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { apiClient, FlowInfo, FlowDetailResponse, FlowRequest } from "../brain";

export default function AIFlowAdmin() {
  const [flows, setFlows] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<string>("");
  const [flowDetails, setFlowDetails] = useState<FlowInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exportCode, setExportCode] = useState<string>("");
  const [showExport, setShowExport] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [componentTypes, setComponentTypes] = useState<string[]>([]);
  
  // Fetch flows on component mount
  useEffect(() => {
    fetchFlows();
    fetchComponentTypes();
  }, []);
  
  // Fetch flow details when a flow is selected
  useEffect(() => {
    if (selectedFlow) {
      fetchFlowDetails(selectedFlow);
    } else {
      setFlowDetails(null);
    }
  }, [selectedFlow]);
  
  const fetchFlows = async () => {
    setIsLoading(true);
    try {
      const flows = await apiClient.getAvailableFlows();
      setFlows(flows);
      if (flows.length > 0 && !selectedFlow) {
        setSelectedFlow(flows[0]);
      }
    } catch (error) {
      console.error("Error fetching flows:", error);
      setStatus({ 
        type: "error", 
        message: "Failed to fetch flows" 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchComponentTypes = async () => {
    try {
      const types = await apiClient.getComponentTypes();
      setComponentTypes(types);
    } catch (error) {
      console.error("Error fetching component types:", error);
    }
  };
  
  const fetchFlowDetails = async (flowName: string) => {
    setIsLoading(true);
    try {
      const details = await apiClient.getFlowDetails(flowName);
      setFlowDetails(details.flow);
    } catch (error) {
      console.error(`Error fetching details for flow ${flowName}:`, error);
      setStatus({ 
        type: "error", 
        message: `Failed to fetch details for ${flowName}` 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteFlow = async () => {
    if (!selectedFlow) return;
    
    if (!window.confirm(`Are you sure you want to delete the flow '${selectedFlow}'?`)) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiClient.deleteFlow(selectedFlow);
      if (response.success) {
        setStatus({ 
          type: "success", 
          message: response.message 
        });
        // Refresh flows
        await fetchFlows();
        setSelectedFlow("");
      } else {
        setStatus({ 
          type: "error", 
          message: response.message 
        });
      }
    } catch (error) {
      console.error(`Error deleting flow ${selectedFlow}:`, error);
      setStatus({ 
        type: "error", 
        message: `Failed to delete flow ${selectedFlow}` 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReloadAgent = async () => {
    if (!selectedFlow) return;
    
    setIsLoading(true);
    try {
      const response = await apiClient.reloadAgent(selectedFlow);
      setStatus({ 
        type: response.success ? "success" : "error", 
        message: response.message 
      });
    } catch (error) {
      console.error(`Error reloading agent ${selectedFlow}:`, error);
      setStatus({ 
        type: "error", 
        message: `Failed to reload agent ${selectedFlow}` 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportFlow = async () => {
    if (!selectedFlow) return;
    
    setIsLoading(true);
    try {
      const code = await apiClient.exportFlowToPython(selectedFlow);
      setExportCode(code);
      setShowExport(true);
    } catch (error) {
      console.error(`Error exporting flow ${selectedFlow}:`, error);
      setStatus({ 
        type: "error", 
        message: `Failed to export flow ${selectedFlow}` 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="bg-card rounded-lg p-6 border border-border mb-6">
          <h1 className="text-2xl font-bold mb-2">AI Flow Administration</h1>
          <p className="text-muted-foreground">Manage your AI agent workflows</p>
        </div>
        
        {status.message && (
          <div 
            className={`p-4 mb-6 rounded-lg ${
              status.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            {status.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flow List */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-4">Available Flows</h2>
            
            {isLoading && flows.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ul className="space-y-2">
                {flows.map(flow => (
                  <li 
                    key={flow}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-muted ${
                      selectedFlow === flow ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedFlow(flow)}
                  >
                    {flow.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </li>
                ))}
                {flows.length === 0 && (
                  <li className="text-muted-foreground italic p-3">No flows available</li>
                )}
              </ul>
            )}
            
            <div className="mt-4">
              <a 
                href="https://docs.langflow.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Learn about Langflow
              </a>
            </div>
          </div>
          
          {/* Flow Details */}
          <div className="bg-card p-6 rounded-lg border border-border md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Flow Details</h2>
            
            {isLoading && !flowDetails ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : flowDetails ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p className="text-lg">{flowDetails.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Node Count</h3>
                    <p className="text-lg">{flowDetails.node_count}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p>{flowDetails.description || "No description available"}</p>
                </div>
                
                {flowDetails.node_types && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Node Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(flowDetails.node_types).map(([type, count]) => (
                        <span 
                          key={type} 
                          className="px-3 py-1 bg-muted rounded-full text-sm"
                        >
                          {type} ({count})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={handleReloadAgent}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Reload Agent
                  </button>
                  
                  <button
                    onClick={handleExportFlow}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Export to Python
                  </button>
                  
                  <button
                    onClick={handleDeleteFlow}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Delete Flow
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground italic">
                Select a flow to view details
              </div>
            )}
            
            {showExport && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Python Code Export</h3>
                  <button
                    onClick={() => setShowExport(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Close
                  </button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  {exportCode}
                </pre>
              </div>
            )}
          </div>
        </div>
        
        {/* Component Types Reference */}
        <div className="mt-6 bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold mb-4">Available Component Types</h2>
          
          <div className="flex flex-wrap gap-2">
            {componentTypes.map(type => (
              <span 
                key={type} 
                className="px-3 py-1 bg-muted rounded-full text-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 