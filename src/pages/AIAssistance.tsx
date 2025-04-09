import React, { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { apiClient, ChatMessage, ChatRequest } from "../brain";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I'm your BiteBase AI assistant. How can I help you with your restaurant analytics today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableFlows, setAvailableFlows] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<string>("restaurant_advisor");
  const [suggestionPrompts, setSuggestionPrompts] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available AI models
  const availableModels = [
    { id: "gpt-4", name: "GPT-4 (Advanced)" },
    { id: "gpt-3.5", name: "GPT-3.5 (Fast)" },
    { id: "claude-3", name: "Claude 3 Opus" },
    { id: "gemini-pro", name: "Gemini Pro" }
  ];

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, streamingMessage]);

  // Fetch available flows and suggestions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const flows = await apiClient.getAvailableFlows();
        setAvailableFlows(flows);
        
        if (flows.length > 0 && !flows.includes(selectedFlow)) {
          setSelectedFlow(flows[0]);
        }
        
        const suggestions = await apiClient.getSuggestions();
        setSuggestionPrompts(suggestions);
      } catch (error) {
        console.error("Error fetching AI data:", error);
      }
    };
    
    fetchData();
  }, []);

  const handleStreamedResponse = async (chatMessages: ChatMessage[]) => {
    setIsLoading(true);
    setStreamingMessage("");
    
    try {
      const response = await fetch('/api/stream-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: chatMessages,
          model: selectedModel,
          flow_name: selectedFlow
        }),
      });
      
      if (!response.body) throw new Error("No response body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedMessage = "";
      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (done) break;
        
        const chunk = decoder.decode(value);
        accumulatedMessage += chunk;
        setStreamingMessage(accumulatedMessage);
      }
      
      setChatHistory(prev => [...prev, { role: "assistant", content: accumulatedMessage }]);
      setStreamingMessage("");
    } catch (error) {
      console.error("Error in streaming response:", error);
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error processing your request. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const newMessage: ChatMessage = { role: "user", content: message };
    const updatedChatHistory = [...chatHistory, newMessage];
    setChatHistory(updatedChatHistory);
    setMessage("");
    
    // Use streaming response
    await handleStreamedResponse(updatedChatHistory);
  };

  const handleFlowChange = (flowName: string) => {
    setSelectedFlow(flowName);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const intervalId = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(intervalId);
            return 100;
          }
          return newProgress;
        });
      }, 300);
      
      // Prepare FormData
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("flow_name", selectedFlow);
      
      // Upload the file
      const response = await apiClient.uploadDocument(formData);
      
      clearInterval(intervalId);
      setUploadProgress(100);
      
      // Add system message about the uploaded file
      setChatHistory(prev => [
        ...prev, 
        { 
          role: "system", 
          content: `File "${files[0].name}" has been uploaded and processed. You can now ask questions about its contents.`
        }
      ]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setChatHistory(prev => [
        ...prev, 
        { 
          role: "system", 
          content: `Error uploading file "${files[0].name}". Please try again.` 
        }
      ]);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleVoiceInput = () => {
    // Check if browser supports SpeechRecognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      // Add system message about listening
      setChatHistory(prev => [
        ...prev, 
        { 
          role: "system", 
          content: "Listening to your voice input..."
        }
      ]);
      
      recognition.start();
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        
        // Remove the listening message
        setChatHistory(prev => prev.filter(msg => msg.content !== "Listening to your voice input..."));
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        // Remove the listening message
        setChatHistory(prev => prev.filter(msg => msg.content !== "Listening to your voice input..."));
        
        setChatHistory(prev => [
          ...prev, 
          { 
            role: "system", 
            content: "Error capturing voice input. Please try again."
          }
        ]);
      };
    } else {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: "system", 
          content: "Voice input is not supported in your browser."
        }
      ]);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the entire chat history?")) {
      setChatHistory([
        { role: "assistant", content: "Hello! I'm your BiteBase AI assistant. How can I help you with your restaurant analytics today?" }
      ]);
    }
  };

  const exportChat = () => {
    const chatText = chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitebase-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="bg-card rounded-lg p-6 border border-border mb-6">
          <h1 className="text-2xl font-bold mb-2">AI Assistant</h1>
          <p className="text-muted-foreground mb-4">Get insights and recommendations for your restaurant</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Flow selector */}
            <div className="flex-1">
              <label htmlFor="flow-selector" className="block text-sm font-medium text-foreground mb-1">
                AI Agent Type:
              </label>
              <select 
                id="flow-selector"
                value={selectedFlow}
                onChange={(e) => handleFlowChange(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {availableFlows.map(flow => (
                  <option key={flow} value={flow}>
                    {flow.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Model selector */}
            <div className="flex-1">
              <label htmlFor="model-selector" className="block text-sm font-medium text-foreground mb-1">
                AI Model:
              </label>
              <select 
                id="model-selector"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {availableModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Actions */}
            <div className="flex-1 flex gap-2 items-end">
              <button
                onClick={clearChat}
                className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-md focus:outline-none"
              >
                Clear Chat
              </button>
              <button
                onClick={exportChat}
                className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-md focus:outline-none"
              >
                Export Chat
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${
                  chat.role === "user" 
                    ? "justify-end" 
                    : chat.role === "system" 
                      ? "justify-center" 
                      : "justify-start"
                }`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-4 ${
                    chat.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : chat.role === "system"
                        ? "bg-muted/50 text-muted-foreground text-sm"
                        : "bg-muted text-foreground"
                  }`}
                >
                  {chat.content}
                </div>
              </div>
            ))}
            
            {streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-muted text-foreground">
                  {streamingMessage}
                  <span className="inline-block w-1 h-4 ml-1 bg-primary animate-pulse"></span>
                </div>
              </div>
            )}
            
            {isLoading && !streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-muted text-foreground">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {isUploading && (
              <div className="flex justify-center">
                <div className="w-full max-w-md p-4 bg-muted/50 rounded-lg">
                  <div className="mb-2 text-sm font-medium text-center">Uploading document...</div>
                  <div className="w-full bg-background rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
          
          {/* Suggestion Chips */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestionPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm"
                  onClick={() => setMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-wrap md:flex-nowrap gap-2">
              <div className="w-full flex gap-2">
                {/* Upload file button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isUploading}
                  className="p-2 bg-muted hover:bg-muted/80 rounded-lg disabled:opacity-50"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                />
                
                {/* Voice input button */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  disabled={isLoading || isUploading}
                  className="p-2 bg-muted hover:bg-muted/80 rounded-lg disabled:opacity-50"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 23H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about your restaurant data..."
                  className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading || isUploading}
                />
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
                disabled={isLoading || isUploading || !message.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
