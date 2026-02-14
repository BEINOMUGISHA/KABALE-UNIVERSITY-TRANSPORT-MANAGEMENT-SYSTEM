
import { GoogleGenAI } from "@google/genai";
import { ROUTES, SCHEDULES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTravelAdvice(query: string) {
  try {
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
