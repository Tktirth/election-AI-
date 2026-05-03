import type { Request, Response } from 'express';
import { calculateReadiness, buildTimelineAndChecklist } from '../services/electionLogic.js';
import { generateAIResponse } from '../services/aiService.js';

export const generateJourney = async (req: Request, res: Response) => {
  try {
    const { age, country, state, isRegistered } = req.body;
    
    // Simulate database save of user profile
    const userProfile = { age, country, state, isRegistered };
    
    // Generate personalized journey
    const journey = buildTimelineAndChecklist(userProfile);
    
    res.status(200).json({ success: true, journey });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to generate journey' });
  }
};

export const getReadinessScore = async (req: Request, res: Response) => {
  try {
    const { checklistState, isRegistered, hasDocuments, knowsLocation } = req.body;
    
    const scoreData = calculateReadiness({ checklistState, isRegistered, hasDocuments, knowsLocation });
    
    res.status(200).json({ success: true, scoreData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to calculate readiness score' });
  }
};

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { prompt, context, explainLikeIm15 } = req.body;
    
    const aiResponse = await generateAIResponse(prompt, context, explainLikeIm15);
    
    res.status(200).json({ success: true, aiResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to communicate with AI' });
  }
};
