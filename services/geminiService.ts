
import { GoogleGenAI } from "@google/genai";
import { ROUTES, SCHEDULES } from "../constants";

// Lazy initialization to avoid crashes if API_KEY is missing
let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Gemini API Key is missing. AI features will be limited.");
    }
    aiInstance = new GoogleGenAI({ apiKey: apiKey || "" });
  }
  return aiInstance;
}

export async function getTravelAdvice(query: string) {
  try {
    const ai = getAI();
    const context = `
      Available University Bus Routes: ${JSON.stringify(ROUTES)}
      Daily Schedule: ${JSON.stringify(SCHEDULES)}
      Kabale University Context: Kabale University is located in Kabale, Uganda. It has several campuses including Kikungiri and Makanga (Medical).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${context}\n\nUser Question: ${query}\n\nProvide helpful, concise travel advice for a university student or staff member based only on the available routes and schedules. If you can't find a direct route, suggest the closest option.`,
      config: {
        systemInstruction: "You are the Kabale University Transport AI Assistant (KUTS-AI). You help students and staff find the best bus routes, schedules, and explain how the system works. Be polite and professional.",
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process your request right now.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "The AI assistant is currently offline. Please check the schedules manually.";
  }
}

export async function generateTransportImage(prompt: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional, high-quality image for Kabale University Transport System: ${prompt}. The style should be modern, clean, and academic.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}

export async function searchNearbyPlaces(query: string, location?: { lat: number, lng: number }) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: location ? {
              latitude: location.lat,
              longitude: location.lng
            } : {
              latitude: -1.2478, // Kabale, Uganda default
              longitude: 29.9864
            }
          }
        }
      },
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return { text: "Could not fetch nearby places at this time.", grounding: [] };
  }
}
