import { Request, Response } from 'express';
import fs from 'fs';
import { analyzeMenuWithVision } from '../services/claudeService';

export async function analyzeMenuRoute(req: Request, res: Response) {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No menu image provided' });
    }

    // Get optional user preferences and language
    const { userPreferences, language = 'en' } = req.body;

    // Read the uploaded file
    const imageBuffer = fs.readFileSync(req.file.path);
    const imageBase64 = imageBuffer.toString('base64');

    // Determine media type and validate it
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const mediaType = req.file.mimetype;

    if (!allowedTypes.includes(mediaType)) {
      return res.status(400).json({
        error: 'Invalid image type. Please upload JPEG, PNG, GIF, or WebP images.'
      });
    }

    // Analyze menu with Claude Vision
    const analysis = await analyzeMenuWithVision(
      imageBase64,
      mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
      userPreferences,
      language
    );

    // Clean up: delete uploaded file after processing
    fs.unlinkSync(req.file.path);

    // Return the analysis
    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in analyzeMenuRoute:', error);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze menu'
    });
  }
}
