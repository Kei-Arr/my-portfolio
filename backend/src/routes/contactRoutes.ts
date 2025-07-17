import { Router } from 'express';
import { sendContactMessage, healthCheck } from '../controllers/contactController';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();


router.post('/contact', rateLimiter, sendContactMessage);


router.get('/health', healthCheck);

export default router;