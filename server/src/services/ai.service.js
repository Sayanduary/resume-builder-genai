// src/services/ai.service.js
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GOOGLE_GENAI_API_KEY");
  }

  return new GoogleGenAI({ apiKey });
};

export const generateAIResponse = async (prompt) => {
  try {
    const ai = getAIClient();
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.text || "No response generated";
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw new Error("AI service failed");
  }
};

export { generateAIResponse as invokeGeminiAI };
