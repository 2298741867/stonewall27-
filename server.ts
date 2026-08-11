import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '50mb' }));

  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Endpoint: Analyze Room Photo
  app.post('/api/analyze-room', async (req, res) => {
    try {
      const { image, roomType, notes } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'Image data is required' });
      }

      let base64Data = image;
      let mimeType = 'image/jpeg';

      if (image.startsWith('data:')) {
        const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
      }

      const ai = getGenAI();

      const prompt = `You are Clutterless, an architectural spatial organizer and interior decluttering expert.
Analyze this photo of a room (${roomType || 'Room'}).
Evaluate object density, surface chaos, cable management, storage efficiency, and visual noise.
Output a structured spatial report following the required JSON schema.

User focus notes: ${notes || 'Analyze spatial geometry and object clutter.'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              roomName: { type: Type.STRING, description: 'Spatial title e.g. "The Library Suite" or "Executive Workspace"' },
              roomType: { type: Type.STRING, description: 'Category e.g. Home Office, Living Room, Closet, Bedroom' },
              clutterVolumeScore: { type: Type.INTEGER, description: 'Clutter percentage 0-100 where 100 is extreme clutter and 0 is pristine minimal' },
              efficiencyIndex: { type: Type.STRING, description: 'Spatial efficiency metric e.g. "+12", "+25", "-8"' },
              atmosphericShift: { type: Type.STRING, description: 'Target mood e.g. "Zen / Minimalist", "Architectural Harmony"' },
              summary: { type: Type.STRING, description: 'Crisp 2-sentence spatial analysis' },
              objectGroups: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    itemCountEstimate: { type: Type.INTEGER },
                    impact: { type: Type.STRING },
                    recommendedAction: { type: Type.STRING }
                  },
                  required: ['category', 'itemCountEstimate', 'impact', 'recommendedAction']
                }
              },
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING, description: 'Short actionable suggestion title' },
                    zoneTag: { type: Type.STRING, description: 'Zone e.g. Desk Surface, North Elevation, Floor Zone' },
                    priority: { type: Type.STRING, description: 'High, Medium, or Low' },
                    timeEstimateMinutes: { type: Type.INTEGER },
                    visualNoiseReductionPct: { type: Type.INTEGER },
                    description: { type: Type.STRING },
                    targetCoordinates: {
                      type: Type.OBJECT,
                      properties: {
                        x: { type: Type.INTEGER, description: 'Normalized percentage X coordinate (10 to 90)' },
                        y: { type: Type.INTEGER, description: 'Normalized percentage Y coordinate (10 to 90)' }
                      },
                      required: ['x', 'y']
                    }
                  },
                  required: ['id', 'title', 'zoneTag', 'priority', 'timeEstimateMinutes', 'visualNoiseReductionPct', 'description', 'targetCoordinates']
                }
              },
              declutterSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    estimatedMinutes: { type: Type.INTEGER }
                  },
                  required: ['stepNumber', 'title', 'detail', 'estimatedMinutes']
                }
              },
              visionConceptPrompt: { type: Type.STRING, description: 'Detailed visual concept of the reorganized room' }
            },
            required: ['roomName', 'roomType', 'clutterVolumeScore', 'efficiencyIndex', 'atmosphericShift', 'summary', 'objectGroups', 'suggestions', 'declutterSteps', 'visionConceptPrompt']
          }
        }
      });

      const jsonStr = response.text || '{}';
      const parsed = JSON.parse(jsonStr);
      res.json(parsed);
    } catch (err: any) {
      console.error('Error analyzing room:', err);
      res.status(500).json({ error: err.message || 'Failed to analyze room' });
    }
  });

  // Endpoint: Generate AI Vision Render (Gemini Image model)
  app.post('/api/generate-vision', async (req, res) => {
    try {
      const { visionPrompt, image } = req.body;
      const ai = getGenAI();

      let parts: any[] = [
        { text: `High architectural quality photo of a perfectly organized, decluttered, minimalist room: ${visionPrompt}. Clean geometry, wire-free surfaces, serene natural light, premium modern aesthetic.` }
      ];

      if (image && typeof image === 'string') {
        let base64Data = image;
        let mimeType = 'image/jpeg';
        if (image.startsWith('data:')) {
          const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
          if (matches) {
            mimeType = matches[1];
            base64Data = matches[2];
          }
        }
        parts.unshift({
          inlineData: { mimeType, data: base64Data }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: { parts },
      });

      let generatedImg = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            generatedImg = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (!generatedImg) {
        return res.status(500).json({ error: 'No image was generated by AI model.' });
      }

      res.json({ imageUrl: generatedImg });
    } catch (err: any) {
      console.error('Error generating vision render:', err);
      res.status(500).json({ error: err.message || 'Failed to generate AI vision render' });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(
          url,
          `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clutterless — Studio Design Intelligence</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, () => {
    console.log(`Clutterless server running on http://localhost:${PORT}`);
  });
}

startServer();
