import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from 'app';

interface LangflowWorkflowCardProps {
  title: string;
  description: string;
  flowId: string;
  icon?: string;
  inputParams: Record<string, any>;
  onComplete?: (result: any) => void;
}

/**
 * A card component that runs a Langflow workflow with predefined parameters
 */
const LangflowWorkflowCard: React.FC<LangflowWorkflowCardProps> = ({
  title,
  description,
  flowId,
  icon = 'fa-robot',
  inputParams,
  onComplete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runWorkflow = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/routes/langflow/flows/${flowId}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputParams),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      
      if (onComplete) {
        onComplete(data);
      }
    } catch (err) {
      console.error('Error running workflow:', err);
      setError('Failed to run the analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <i className={`fas ${icon}`}></i>
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runWorkflow} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
              Running Analysis...
            </span>
          ) : (
            'Run Analysis'
          )}
        </Button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LangflowWorkflowCard;
