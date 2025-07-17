import { Router } from 'express';
import { sendContactMessage, healthCheck } from '../controllers/contactController';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting to contact endpoint
router.post('/contact', rateLimiter, sendContactMessage);

// Health check endpoint
router.get('/health', healthCheck);

export default router;