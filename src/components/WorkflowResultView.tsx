import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkflowResultViewProps {
  result: any;
  type: 'competitor' | 'menu' | 'custom';
}

/**
 * A component to display the results of a workflow analysis
 */
const WorkflowResultView: React.FC<WorkflowResultViewProps> = ({ result, type }) => {
  // Helper function to render different result types
  const renderResult = () => {
    // If result is a string, display it directly
    if (typeof result === 'string') {
      return (
        <div className="whitespace-pre-wrap">
          {result}
        </div>
      );
    }

    // If result has a specific format based on type
    switch (type) {
      case 'competitor':
        return renderCompetitorResult();
      case 'menu':
        return renderMenuResult();
      case 'custom':
      default:
        return renderCustomResult();
    }
  };

  // Render competitor analysis results
  const renderCompetitorResult = () => {
    const insights = result.insights || [];
    const recommendations = result.recommendations || [];
    
    return (
      <div className="space-y-6">
        {/* Insights Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
          <ul className="space-y-2">
            {insights.length > 0 ? (
              insights.map((insight: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No insights available</li>
            )}
          </ul>
        </div>
        
        {/* Recommendations Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.length > 0 ? (
              recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>{rec}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No recommendations available</li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  // Render menu optimization results
  const renderMenuResult = () => {
    const topItems = result.top_items || [];
    const underperforming = result.underperforming || [];
    const recommendations = result.recommendations || [];
    
    return (
      <div className="space-y-6">
        {/* Top Performing Items */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Top Performing Items</h3>
          <ul className="space-y-2">
            {topItems.length > 0 ? (
              topItems.map((item: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">↑</span>
                  <span>
                    <strong>{item.name}</strong>: {item.description || item.reason}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No top items available</li>
            )}
          </ul>
        </div>
        
        {/* Underperforming Items */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Underperforming Items</h3>
          <ul className="space-y-2">
            {underperforming.length > 0 ? (
              underperforming.map((item: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">↓</span>
                  <span>
                    <strong>{item.name}</strong>: {item.description || item.reason}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No underperforming items identified</li>
            )}
          </ul>
        </div>
        
        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.length > 0 ? (
              recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>{rec}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No recommendations available</li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  // Render custom/generic results
  const renderCustomResult = () => {
    // Try to extract common fields that might be in the result
    const summary = result.summary || result.output || '';
    const details = result.details || [];
    const recommendations = result.recommendations || [];
    
    return (
      <div className="space-y-6">
        {/* Summary Section */}
        {summary && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Summary</h3>
            <div className="p-3 bg-muted rounded-md">
              {summary}
            </div>
          </div>
        )}
        
        {/* Details Section */}
        {details.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Details</h3>
            <ul className="space-y-2">
              {details.map((detail: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Fallback for completely custom formats */}
        {!summary && details.length === 0 && recommendations.length === 0 && (
          <pre className="p-4 bg-muted rounded-md overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        {renderResult()}
      </CardContent>
    </Card>
  );
};

export default WorkflowResultView;
