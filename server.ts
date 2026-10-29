import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateLocalPlans } from './src/utils/planGenerator';
import { PlanPreferences, AdventurePlan } from './src/types';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Status endpoint
app.get('/api/status', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    app: 'Modo Tuani'
  });
});

// Plan generation endpoint with Gemini AI + Local Fallback
app.post('/api/generate-plans', async (req, res) => {
  const prefs: PlanPreferences = req.body;
  
  if (!prefs || typeof prefs !== 'object') {
    return res.status(400).json({ error: 'Preferencias no válidas' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyValid = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');

  if (isKeyValid) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Actuá como diseñador de experiencias locales y experto de aventuras urbanas en Nicaragua para la app "Modo Tuani".
El usuario busca matar el aburrimiento con planes a medida con vibra nicaragüense y voseo natural ("¿Qué hacemos hoy?", "Armame un plan", "Dale viaje").

Parámetros del usuario:
- Ciudad / Zona: ${prefs.city || 'Nicaragua'}
- Presupuesto total: ${prefs.currency === 'USD' ? '$' : 'C$'}${prefs.budget} para TODO el grupo
- Duración: ${prefs.duration}
- Compañía: ${prefs.company} (${prefs.peopleCount} persona(s))
- Estado de ánimo: ${prefs.mood}
- Preferencia de lugar: ${prefs.preference} (casa, afuera o cualquiera)

REGLAS ESTRICTAS:
1. Generá exactamente 3 alternativas REALMENTE distintas (una más relajada/social, una de micro-aventura o caminata, una creativa o gastronómica típica).
2. El costo total estimado de cada plan NO DEBE EXCEDER ${prefs.currency === 'USD' ? '$' : 'C$'}${prefs.budget}. Si el presupuesto es 0, TODO es estrictamente gratuito (C$ 0).
3. No inventés nombres de negocios específicos con horarios o precios confirmados inexistentes. Usá descripciones vivas de espacios públicos (parque central, mirador, aceras históricas, pulpería tradicional, cafecito de barrio, sala de casa convertida en cine).
4. Cada plan debe tener entre 3 y 5 pasos concretos y realizables.
5. Incluí un desglose de presupuesto estimado, lista de qué llevar (packing list) y una alternativa por lluvia.
6. Devolvé ÚNICAMENTE un JSON válido con la siguiente estructura de TypeScript:
{
  "plans": [
    {
      "name": "string (nombre memorable y sonoro)",
      "tagline": "string (frase corta de gancho)",
      "description": "string (descripción en 2 frases)",
      "estimatedCost": number (menor o igual a ${prefs.budget}),
      "energyLevel": "Tranqui" | "Bajo" | "Medio" | "Alto" | "Tuani intenso",
      "fitReason": "string (por qué cuadra con el ánimo y compañía)",
      "steps": [
        {
          "title": "string",
          "description": "string",
          "durationMinutes": number,
          "estimatedCost": number
        }
      ],
      "budgetBreakdown": [
        { "concept": "string", "amount": number }
      ],
      "packingList": ["string"],
      "rainAlternative": {
        "title": "string",
        "description": "string",
        "adjustedSteps": ["string"]
      }
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);

      if (parsed && Array.isArray(parsed.plans) && parsed.plans.length === 3) {
        // Enhance with client attributes (IDs, status, twist)
        const plans: AdventurePlan[] = parsed.plans.map((p: any, idx: number) => {
          const calculatedCost = Math.min(
            prefs.budget,
            p.estimatedCost ?? p.steps?.reduce((acc: number, s: any) => acc + (s.estimatedCost || 0), 0) ?? 0
          );

          return {
            id: `plan-gemini-${Date.now()}-${idx}`,
            name: p.name || `Plan Tuani ${idx + 1}`,
            tagline: p.tagline || 'Aventura recomendada',
            description: p.description || '',
            estimatedCost: prefs.budget === 0 ? 0 : calculatedCost,
            currency: prefs.currency,
            durationLabel: prefs.duration,
            durationMinutes: p.steps?.reduce((acc: number, s: any) => acc + (s.durationMinutes || 20), 0) || 60,
            energyLevel: p.energyLevel || 'Medio',
            fitReason: p.fitReason || 'Encaja con tus preferencias',
            steps: (p.steps || []).map((s: any, sIdx: number) => ({
              id: `step-${idx}-${sIdx}-${Date.now()}`,
              title: s.title || `Paso ${sIdx + 1}`,
              description: s.description || '',
              durationMinutes: s.durationMinutes || 20,
              estimatedCost: prefs.budget === 0 ? 0 : (s.estimatedCost || 0),
              isDone: false
            })),
            budgetBreakdown: prefs.budget === 0 
              ? [{ concept: 'Actividad 100% gratuita', amount: 0 }]
              : (p.budgetBreakdown || [{ concept: 'Gastos estimados', amount: calculatedCost }]),
            packingList: p.packingList || ['Termo de agua', 'Zapatos cómodos'],
            rainAlternative: p.rainAlternative || {
              title: 'Alternativa bajo techo',
              description: 'Continuar en un espacio techado con juegos y plática',
              adjustedSteps: ['Resguardarse', 'Disfrutar la plática']
            },
            createdAt: new Date().toISOString(),
            city: prefs.city || 'tu zona',
            company: prefs.company,
            mood: prefs.mood
          };
        });

        return res.json({ plans, source: 'gemini' });
      }
    } catch (err) {
      console.warn('Gemini generation failed, falling back to smart local generator:', err);
    }
  }

  // Local fallback (works 100% offline or when no Gemini API key is configured)
  const plans = generateLocalPlans(prefs);
  return res.json({ plans, source: 'local' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Modo Tuani server running on port ${PORT}`);
  });
}

startServer();
