import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set your API key in the Secrets panel under Settings before making requests.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // API Route: Generic generation endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, history, systemInstruction } = req.body;
      const ai = getGeminiClient();

      const contents: any[] = [];
      
      // Load history if any
      if (history && Array.isArray(history)) {
        history.forEach((msg: any) => {
          contents.push({
            role: msg.role === "assistant" ? "model" : msg.role,
            parts: [{ text: msg.text }]
          });
        });
      }

      // Add actual prompt
      if (prompt) {
        contents.push({
          role: "user",
          parts: [{ text: prompt }]
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: systemInstruction || "You are a professional and encouraging AI learning & career partner helping students map out high-income remote AI paths.",
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // API Route: Search reputable online course & career databases using Gemini
  app.post("/api/search-online", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query parameter is required" });
      }

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Search reputable and respectful online databases (such as Coursera, Harvard edX, Stanford Online, LinkedIn Learning, Google Career Certificates, AWS Academy, and premium remote career directories) for top courses, learning tracks, and remote career paths matching this query: "${query}". Return the matching items in a structured list conforming to the schema.`,
        config: {
          systemInstruction: "You are a professional aggregator and indexer of respectful, highly-reputable online education courses, professional credentials, and remote career opportunities. You extract accurate information from Coursera, AWS, edX, Google, and major trusted remote portals. Return the results in pure JSON format conforming strictly to the requested schema. Provide realistic titles, actual typical providers, relevant estimation criteria, and helpful industry alignment tips. Avoid spam or unrespectful resources.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              results: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: "Must be 'module' (for individual courses), 'career' (for remote roles), 'track' (for certificate programs), or 'certificate'" },
                    title: { type: Type.STRING, description: "Detailed name of the course or remote career position" },
                    subtitle: { type: Type.STRING, description: "Reputable provider/platform, e.g. 'Google / Coursera', 'Stanford / edX', 'AWS Academy'" },
                    meta: { type: Type.STRING, description: "Standard stats like typical duration, skills or typical remote salary, e.g. 'Duration: 12h | Est. Salary: $105,000'" },
                    badge: { type: Type.STRING, description: "Label like 'Course', 'Career', or 'Certificate'" },
                    additionalInfo: { type: Type.STRING, description: "A highly informative, deep description of why this path/course is respectful, what competencies it measures, and how it maps to high-income remote opportunities" },
                    source: { type: Type.STRING, description: "Primary database source, e.g. 'Coursera', 'edX', 'LinkedIn Learning', 'AWS'" }
                  },
                  required: ["type", "title", "subtitle", "meta", "badge", "additionalInfo", "source"]
                }
              }
            },
            required: ["results"]
          }
        }
      });

      const responseText = response.text || "{\"results\": []}";
      const parsed = JSON.parse(responseText.trim());
      res.json(parsed);
    } catch (error: any) {
      console.error("Online Search API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred during database search." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
