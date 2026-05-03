import express from 'express';
import { generateJourney, getReadinessScore, chatWithAI } from '../controllers/electionController.js';

const router = express.Router();

router.post('/onboard', generateJourney);
router.post('/readiness', getReadinessScore);
router.post('/chat', chatWithAI);

export default router;
