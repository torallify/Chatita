import { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

interface NutritionAnalysis {
  detectedFoods: string[];
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  portionSize: string;
}

export async function analyzeMealRoute(req: Request, res: Response) {
  console.log('🍽️ Meal analysis started...');

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ No API key configured');
      return res.status(500).json({
        success: false,
        error: 'Anthropic API key is not configured',
      });
    }

    // Initialize Anthropic client with API key from environment
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    if (!req.file) {
      console.error('❌ No image file provided');
      return res.status(400).json({
        success: false,
        error: 'No image file provided',
      });
    }

    const language = req.body.language || 'en';
    const imagePath = req.file.path;
    console.log(`📸 Image received: ${req.file.originalname} (${req.file.size} bytes)`);

    // Read the image file and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Determine the media type
    const ext = path.extname(req.file.originalname).toLowerCase();
    const mediaTypeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
    };
    const mediaType = mediaTypeMap[ext] || 'image/jpeg';

    // Prepare the prompt based on language
    const prompts = {
      en: `You are a nutrition expert AI assistant for people with diabetes. Analyze this meal photo and provide detailed nutritional information.

Please analyze the image and return ONLY a valid JSON object (no markdown, no explanations) with this exact structure:
{
  "detectedFoods": ["list", "of", "detected", "food", "items"],
  "calories": estimated_total_calories_as_number,
  "carbs": estimated_carbs_in_grams_as_number,
  "protein": estimated_protein_in_grams_as_number,
  "fat": estimated_fat_in_grams_as_number,
  "fiber": estimated_fiber_in_grams_as_number,
  "sugar": estimated_sugar_in_grams_as_number,
  "sodium": estimated_sodium_in_mg_as_number,
  "portionSize": "description like '1 plate (350g)' or '2 cups' etc"
}

Important guidelines:
- Be as accurate as possible with estimates based on visible portions
- List all food items you can identify
- Provide realistic nutritional estimates
- Consider typical serving sizes for diabetes management
- Return ONLY the JSON object, no other text`,
      es: `Eres un asistente de IA experto en nutrición para personas con diabetes. Analiza esta foto de comida y proporciona información nutricional detallada.

Por favor analiza la imagen y devuelve SOLO un objeto JSON válido (sin markdown, sin explicaciones) con esta estructura exacta:
{
  "detectedFoods": ["lista", "de", "alimentos", "detectados"],
  "calories": calorías_totales_estimadas_como_número,
  "carbs": carbohidratos_estimados_en_gramos_como_número,
  "protein": proteína_estimada_en_gramos_como_número,
  "fat": grasa_estimada_en_gramos_como_número,
  "fiber": fibra_estimada_en_gramos_como_número,
  "sugar": azúcar_estimada_en_gramos_como_número,
  "sodium": sodio_estimado_en_mg_como_número,
  "portionSize": "descripción como '1 plato (350g)' o '2 tazas' etc"
}

Pautas importantes:
- Sé lo más preciso posible con las estimaciones basadas en porciones visibles
- Lista todos los alimentos que puedas identificar
- Proporciona estimaciones nutricionales realistas
- Considera tamaños de porción típicos para el manejo de diabetes
- Devuelve SOLO el objeto JSON, sin otro texto`,
    };

    const prompt = prompts[language as keyof typeof prompts] || prompts.en;

    console.log('🤖 Calling Claude Vision API...');
    const startTime = Date.now();

    // Call Claude Vision API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType as any,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    const duration = Date.now() - startTime;
    console.log(`✅ Claude API responded in ${duration}ms`);

    // Extract the response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Clean up the uploaded file
    fs.unlinkSync(imagePath);

    // Parse the JSON response
    let analysis: NutritionAnalysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      // Provide default values if parsing fails
      analysis = {
        detectedFoods: ['Unable to analyze meal'],
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        portionSize: 'Unknown',
      };
    }

    console.log('✅ Analysis complete, sending response');
    res.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('❌ Error in analyzeMealRoute:', error.message);
    console.error('Stack:', error.stack);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze meal',
    });
  }
}
