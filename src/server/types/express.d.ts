
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      // Add any custom properties to the Request object here if needed
    }
    
    interface Response {
      // Add any custom properties to the Response object here if needed
    }
  }
}

export {};
