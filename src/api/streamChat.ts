import { ChatMessage } from "../brain/data-contracts";

// Define the API endpoint URL
const STREAM_API_URL = '/api/stream-chat';

/**
 * Streams chat messages from the AI model using Server-Sent Events
 * 
 * @param messages Array of previous chat messages
 * @param model The AI model to use (e.g. "gpt-4", "claude-3")
 * @param flowName The AI flow/agent to use
 * @param onMessage Callback function that receives each chunk of the streamed response
 * @param onComplete Callback function called when streaming is complete
 * @param onError Callback function called when an error occurs
 * @returns A function that can be called to abort the stream
 */
export const streamChat = (
  messages: ChatMessage[],
  model: string,
  flowName: string,
  onMessage: (chunk: string) => void,
  onComplete: (fullMessage: string) => void,
  onError: (error: Error) => void
): () => void => {
  // Create an AbortController to allow cancellation
  const controller = new AbortController();
  const { signal } = controller;
  
  // Store the complete message as it's being built
  let completeMessage = '';
  
  // Start the fetch request
  fetch(STREAM_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      model,
      flow_name: flowName
    }),
    signal
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser.');
      }
      
      // Get a reader from the response body stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      // Read the stream
      const processStream = ({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
        // If the stream is done, call onComplete with the entire message
        if (done) {
          onComplete(completeMessage);
          return Promise.resolve();
        }
        
        // Decode the chunk and add it to the complete message
        const chunk = decoder.decode(value, { stream: true });
        completeMessage += chunk;
        
        // Call the message handler with the new chunk
        onMessage(chunk);
        
        // Continue reading
        return reader.read().then(processStream);
      };
      
      // Start reading the stream
      return reader.read().then(processStream);
    })
    .catch(error => {
      // Only call onError for non-abort errors
      if (error.name !== 'AbortError') {
        onError(error);
      }
    });
  
  // Return a function that can be called to abort the stream
  return () => controller.abort();
};

/**
 * Simple function to use the streaming API with Promises
 * 
 * @param messages Array of previous chat messages
 * @param model The AI model to use
 * @param flowName The AI flow/agent to use
 * @returns A Promise with the complete response
 */
export const streamChatPromise = (
  messages: ChatMessage[],
  model: string,
  flowName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let fullResponse = '';
    
    streamChat(
      messages,
      model,
      flowName,
      (chunk) => {
        fullResponse += chunk;
      },
      (completeMessage) => {
        resolve(completeMessage);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export default streamChat; 