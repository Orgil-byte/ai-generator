import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const aiApi = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Why is the sky blue?",
    });
    return response?.text ?? "";
  } catch (error: any) {
    if (error?.status === "RESOURCE_EXHAUSTED") {
      throw new Error(
        "Rate limit reached. Please wait a moment and try again.",
      );
    }
    throw error;
  }
};
