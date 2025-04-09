import { Request, Response } from 'express';
import OpenAI from 'openai';
import { ChatMessage } from '../../brain/data-contracts';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Stream chat API endpoint that uses Server-Sent Events to stream
 * AI model responses back to the client
 */
export const streamChatHandler = async (req: Request, res: Response) => {
  try {
    const { messages, model = 'gpt-4', flow_name } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // If it's a flow-based request, use the flow-specific handler
    if (flow_name) {
      return await handleFlowStream(messages, model, flow_name, res);
    }

    // Format messages for OpenAI API
    const formattedMessages = messages.map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Create completion stream
    const stream = await openai.chat.completions.create({
      model: model,
      messages: formattedMessages,
      stream: true,
    });

    // Process each chunk from the stream
    for await (const chunk of stream) {
      // Extract the content from the chunk
      const content = chunk.choices[0]?.delta?.content || '';
      
      if (content) {
        // Write the content to the response
        res.write(content);
      }
    }

    // End the response
    res.end();
  } catch (error) {
    console.error('Error in stream chat:', error);
    
    // If headers haven't been sent yet, send an error response
    if (!res.headersSent) {
      res.status(500).json({ error: 'An error occurred while streaming the chat response' });
    } else {
      // Otherwise, end the stream with an error message
      res.write('\n\nAn error occurred while generating the response.');
      res.end();
    }
  }
};

/**
 * Handle streaming responses for flow-specific requests
 */
const handleFlowStream = async (
  messages: ChatMessage[],
  model: string,
  flowName: string,
  res: Response
) => {
  try {
    // Get the flow definition
    const flow = await getFlow(flowName);
    
    if (!flow) {
      res.write('Error: Flow not found');
      return res.end();
    }

    // Create a system message for the flow
    const systemMessage = {
      role: 'system',
      content: flow.system_prompt || 'You are a helpful assistant specialized in restaurant analytics.',
    };

    // Format messages including the system message
    const formattedMessages = [
      systemMessage,
      ...messages.map((msg: ChatMessage) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Create completion stream
    const stream = await openai.chat.completions.create({
      model: model,
      messages: formattedMessages,
      stream: true,
    });

    // Process each chunk from the stream
    for await (const chunk of stream) {
      // Extract the content from the chunk
      const content = chunk.choices[0]?.delta?.content || '';
      
      if (content) {
        // Write the content to the response
        res.write(content);
      }
    }

    // End the response
    res.end();
  } catch (error) {
    console.error('Error in flow stream:', error);
    res.write('\n\nAn error occurred while processing your request with the specified flow.');
    res.end();
  }
};

/**
 * Get a flow definition by name
 */
const getFlow = async (flowName: string) => {
  // This would normally fetch from a database
  // For now, just return a mock flow
  return {
    id: flowName,
    name: flowName,
    system_prompt: `You are an AI assistant specialized in restaurant analytics. 
    You help restaurant owners understand their data and make better business decisions.
    Flow: ${flowName}`,
    // Other flow configuration...
  };
};

export default streamChatHandler; 