import { Request, Response } from 'express';
import { generateWeeklyInsights } from '../services/claudeService';

export async function generateInsightsRoute(req: Request, res: Response) {
  try {
    // Extract data from request body
    const { meals = [], glucoseReadings = [], moodEntries = [], language = 'en' } = req.body;

    // Validate that we have some data to analyze
    if (meals.length === 0 && glucoseReadings.length === 0 && moodEntries.length === 0) {
      return res.status(400).json({
        error: 'No data provided for insights generation'
      });
    }

    // Generate insights using Claude
    const insights = await generateWeeklyInsights(
      {
        meals,
        glucoseReadings,
        moodEntries
      },
      language
    );

    // Return the insights
    res.json({
      success: true,
      insights,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in generateInsightsRoute:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate insights'
    });
  }
}
