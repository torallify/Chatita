import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-4-20250514';

/**
 * Analyzes a menu image and provides diabetes-friendly recommendations
 */
export async function analyzeMenuWithVision(
  imageBase64: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
  userPreferences?: string,
  language: 'en' | 'es' = 'en'
): Promise<any> {
  // Initialize Anthropic client with API key from environment
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  });

  const grandmotherPersona = language === 'es'
    ? `Eres Chatita, una compañera de salud cariñosa y sabia que ayuda a personas con diabetes a tomar buenas decisiones sobre comida. Eres cálida, alentadora, nunca crítica. Hablas con amor pero también con conocimiento sobre el manejo de la diabetes.`
    : `You are Chatita, a loving and wise health companion helping people with diabetes make good food choices. You are warm, encouraging, never judgmental. You speak with care and knowledge about diabetes management.`;

  const userContext = userPreferences
    ? language === 'es'
      ? `\n\nEl usuario mencionó: "${userPreferences}"`
      : `\n\nThe user mentioned: "${userPreferences}"`
    : '';

  const taskPrompt = language === 'es'
    ? `Analiza esta foto de menú de restaurante y recomienda 2-3 opciones aptas para diabetes. Para cada opción, incluye:

1. **Nombre del platillo**
2. **Por qué es buena opción** (bajo en azúcares, carbohidratos complejos, etc.)
3. **Consejos prácticos** sobre cómo comerlo (ej: "come las verduras primero", "pide aderezo aparte")
4. **Precauciones** si las hay (ej: "evita el pan", "toma agua en lugar de refresco")

Responde en formato JSON con esta estructura:
{
  "recommendations": [
    {
      "dishName": "nombre del platillo",
      "reason": "por qué es buena opción",
      "tips": ["consejo 1", "consejo 2"],
      "warnings": ["precaución si aplica"]
    }
  ],
  "generalAdvice": "consejo general cariñoso"
}

Recuerda: Sé específica, práctica, y siempre con cariño. Si el usuario tiene antojo de algo, honra ese antojo pero ayúdale a comerlo de manera más saludable.${userContext}`
    : `Analyze this restaurant menu photo and recommend 2-3 diabetes-friendly options. For each option, include:

1. **Dish name**
2. **Why it's a good choice** (low in sugars, complex carbs, etc.)
3. **Practical tips** on how to eat it (e.g., "eat veggies first", "ask for dressing on the side")
4. **Warnings** if any (e.g., "skip the bread", "drink water instead of soda")

Respond in JSON format with this structure:
{
  "recommendations": [
    {
      "dishName": "dish name",
      "reason": "why it's a good choice",
      "tips": ["tip 1", "tip 2"],
      "warnings": ["warning if applicable"]
    }
  ],
  "generalAdvice": "warm, caring advice"
}

Remember: Be specific, practical, and always caring. If the user craves something, honor that craving but help them eat it in a healthier way.${userContext}`;

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: grandmotherPersona,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: taskPrompt,
            },
          ],
        },
      ],
    });

    // Extract the text response
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse JSON response
    const responseText = textContent.text;

    // Try to extract JSON from the response (Claude might wrap it in markdown)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error('Error analyzing menu:', error);
    throw new Error(`Failed to analyze menu: ${error.message}`);
  }
}

/**
 * Generates weekly insights based on user data (meals, glucose, mood)
 */
export async function generateWeeklyInsights(
  userData: {
    meals: any[];
    glucoseReadings: any[];
    moodEntries: any[];
  },
  language: 'en' | 'es' = 'en'
): Promise<any> {
  // Initialize Anthropic client with API key from environment
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  });

  const grandmotherPersona = language === 'es'
    ? `Eres Chatita, una compañera de salud cariñosa que revisa los datos de salud del usuario con diabetes de la última semana. Eres alentadora, celebras los logros, y das sugerencias gentiles cuando ves áreas de mejora. Siempre hablas con amor.`
    : `You are Chatita, a caring health companion reviewing the user's diabetes health data from the past week. You are encouraging, celebrate wins, and give gentle suggestions when you see areas for improvement. You always speak with care and warmth.`;

  const taskPrompt = language === 'es'
    ? `Analiza estos datos de la última semana y genera 3-4 tarjetas de insight. Cada tarjeta debe:

1. **Destacar un patrón** (bueno o área de mejora)
2. **Explicar por qué importa**
3. **Dar un consejo práctico y amoroso**

Datos de la semana:
- Comidas registradas: ${userData.meals.length}
- Lecturas de glucosa: ${JSON.stringify(userData.glucoseReadings)}
- Estados de ánimo: ${JSON.stringify(userData.moodEntries)}

Responde en formato JSON:
{
  "insights": [
    {
      "title": "título corto",
      "message": "observación cariñosa",
      "type": "positive" | "neutral" | "suggestion",
      "icon": "emoji apropiado"
    }
  ]
}

Sé específica con los números. Celebra los logros. Si hay preocupaciones, exprésalas con amor y sugerencias prácticas.`
    : `Analyze this week's data and generate 3-4 insight cards. Each card should:

1. **Highlight a pattern** (good or area for improvement)
2. **Explain why it matters**
3. **Give practical, loving advice**

Week's data:
- Meals logged: ${userData.meals.length}
- Glucose readings: ${JSON.stringify(userData.glucoseReadings)}
- Mood entries: ${JSON.stringify(userData.moodEntries)}

Respond in JSON format:
{
  "insights": [
    {
      "title": "short title",
      "message": "caring, supportive observation",
      "type": "positive" | "neutral" | "suggestion",
      "icon": "appropriate emoji"
    }
  ]
}

Be specific with numbers. Celebrate wins. If there are concerns, express them with love and practical suggestions.`;

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1200,
      system: grandmotherPersona,
      messages: [
        {
          role: 'user',
          content: taskPrompt,
        },
      ],
    });

    // Extract the text response
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse JSON response
    const responseText = textContent.text;

    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error('Error generating insights:', error);
    throw new Error(`Failed to generate insights: ${error.message}`);
  }
}
