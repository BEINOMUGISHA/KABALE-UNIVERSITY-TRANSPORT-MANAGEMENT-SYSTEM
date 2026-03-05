
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getTravelAdvice = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini Error:', error);
    return "I'm having trouble connecting to my AI brain right now. Please try again later!";
  }
};

export const generateTransportImage = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Generate a high-quality conceptual image of a university transport system: ${prompt}` }],
      },
    });
    
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Image Generation Error:', error);
    return null;
  }
};

export const searchNearbyPlaces = async (query: string, lat?: number, lng?: number) => {
  try {
    const config: any = {
      tools: [{ googleMaps: {} }],
    };
    
    if (lat !== undefined && lng !== undefined) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find nearby places for: ${query}`,
      config,
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const places = chunks?.map((chunk: any) => ({
      title: chunk.maps?.title,
      uri: chunk.maps?.uri
    })).filter((p: any) => p.title && p.uri) || [];

    return {
      text: response.text || "No description available.",
      places
    };
  } catch (error) {
    console.error('Map Search Error:', error);
    return { text: "I couldn't search for places right now.", places: [] };
  }
};
