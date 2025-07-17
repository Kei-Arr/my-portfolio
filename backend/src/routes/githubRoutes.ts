import express from 'express';
import { getGitHubContributions } from '../controllers/githubController';

const router = express.Router();


router.get('/contributions', getGitHubContributions);

export default router; 