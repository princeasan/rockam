import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertContactMessageSchema } from '../shared/schema';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Simple in-memory storage for demo (in production, use a database)
const contactMessages: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Validate the request body
      const contactData = insertContactMessageSchema.parse(req.body);
      
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
      return res.status(200).json({
        success: true,
        message: "Contact message received successfully. Would be sent to info@rockam.ai in production.",
        data: message
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      }
      
      // Handle other errors
      console.error("Error processing contact form:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request. Please try again later."
      });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: contactMessages
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}