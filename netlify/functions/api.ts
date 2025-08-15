import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { insertContactMessageSchema } from '../../shared/schema';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Simple in-memory storage for demo (in production, use a database)
const contactMessages: any[] = [];

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Parse the path to determine the endpoint
  const path = event.path.replace('/.netlify/functions/api', '');
  
  if (path === '/contact' || path === '/contact/') {
    if (event.httpMethod === 'POST') {
      try {
        if (!event.body) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: "Request body is required"
            })
          };
        }

        const body = JSON.parse(event.body);
        
        // Validate the request body
        const contactData = insertContactMessageSchema.parse(body);
        
        // Add timestamp and ID
        const message = {
          id: Date.now().toString(),
          ...contactData,
          createdAt: new Date().toISOString()
        };
        
        // Store the contact message
        contactMessages.push(message);
        
        // Log email details
        console.log(`
=========== EMAIL NOTIFICATION ==========
TO: info@rockam.ai
FROM: ${contactData.email}
SUBJECT: New Contact Form Submission
NAME: ${contactData.name}
INTEREST: ${contactData.interest}
MESSAGE: ${contactData.message}
========================================
        `);
        
        // Return success response
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: "Contact message received successfully. Would be sent to info@rockam.ai in production.",
            data: message
          })
        };
      } catch (error) {
        // Handle validation errors
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: "Validation error",
              errors: validationError.message
            })
          };
        }
        
        // Handle other errors
        console.error("Error processing contact form:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            message: "An error occurred while processing your request. Please try again later."
          })
        };
      }
    }

    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: contactMessages
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' })
  };
};