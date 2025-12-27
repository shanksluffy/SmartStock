
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SectorInsight } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getSectorInsight(sectorName: string): Promise<SectorInsight> {
    const prompt = `
      As an expert stock market analyst, provide the latest insights for the "${sectorName}" sector.
      Include:
      1. A short high-level summary of the current market trend for this sector.
      2. 3-5 of the most recent and important news items.
      3. Top 3-5 leading companies (Dragons/Blue chips) that investors should watch, with reasons.
      4. 2-3 relevant mutual funds or ETFs for this sector.

      Return the data strictly in JSON format with this structure:
      {
        "sector": "${sectorName}",
        "trend": "bullish | bearish | neutral",
        "summary": "overall trend summary",
        "news": [
          { "title": "...", "summary": "...", "source": "...", "url": "...", "timestamp": "..." }
        ],
        "leaders": [
          { "symbol": "...", "name": "...", "marketCap": "...", "reason": "..." }
        ],
        "funds": [
          { "name": "...", "code": "...", "description": "..." }
        ]
      }
    `;

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        },
      });

      const text = response.text || '{}';
      const parsedData = JSON.parse(text.replace(/```json|```/g, '').trim());
      
      // Extract grounding sources
      const sources: Array<{title: string, uri: string}> = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({ title: chunk.web.title, uri: chunk.web.uri });
          }
        });
      }

      return {
        ...parsedData,
        groundingSources: sources
      };
    } catch (error) {
      console.error("Error fetching sector insight:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
