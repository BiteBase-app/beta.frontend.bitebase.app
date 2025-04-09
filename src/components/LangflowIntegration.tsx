import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from 'app';

interface LangflowWidgetProps {
  flowId?: string;
  title: string;
  description?: string;
  inputPlaceholder?: string;
}

interface LangflowEditorProps {
  flowId?: string;
  onFlowSaved?: (flowId: string) => void;
}

/**
 * A widget to interact with a Langflow flow
 */
export const LangflowWidget: React.FC<LangflowWidgetProps> = ({
  flowId,
  title,
  description,
  inputPlaceholder = "Ask me anything..."
}) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !flowId) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/routes/langflow/flows/${flowId}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.output || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error running flow:', err);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder={inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px]"
          />
          
          <Button 
            type="submit" 
            disabled={isLoading || !flowId}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Response:</h3>
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * A component to edit Langflow flows
 */
export const LangflowEditor: React.FC<LangflowEditorProps> = ({
  flowId,
  onFlowSaved
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flowData, setFlowData] = useState<any>(null);

  // Fetch flow data if flowId is provided
  useEffect(() => {
    if (flowId) {
      fetchFlowData();
    } else {
      // Initialize with empty flow
      setFlowData({
        nodes: [],
        edges: []
      });
    }
  }, [flowId]);

  const fetchFlowData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/routes/langflow/flows/${flowId}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setFlowData(data);
    } catch (err) {
      console.error('Error fetching flow:', err);
      setError('Failed to load flow data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!flowData) return;

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = flowId 
        ? `${API_URL}/routes/langflow/flows/${flowId}` 
        : `${API_URL}/routes/langflow/flows`;
      
      const method = flowId ? 'PUT' : 'POST';
      
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowData),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      
      if (onFlowSaved) {
        onFlowSaved(data.id || flowId);
      }
      
    } catch (err) {
      console.error('Error saving flow:', err);
      setError('Failed to save flow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !flowData) {
    return (
      <Card className="w-full h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }

  if (error && !flowData) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
          <Button onClick={fetchFlowData} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Flow Editor</CardTitle>
          <CardDescription>Edit your AI workflow</CardDescription>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Flow'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] border rounded-md p-4 bg-muted/50">
          {/* This would be replaced with the actual Langflow editor component */}
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Langflow Editor would be embedded here. For now, this is a placeholder.
            </p>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
