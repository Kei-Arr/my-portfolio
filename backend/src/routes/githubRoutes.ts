import express from 'express';
import { getGitHubContributions } from '../controllers/githubController';
import { rateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Get GitHub contributions data
router.get('/contributions', rateLimiter, getGitHubContributions);

export default router; 