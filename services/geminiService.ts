
import { GoogleGenAI, Type } from "@google/genai";

// Use API key directly from process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateJobDescription = async (title: string, company: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, structured job description for "${title}" at "${company}". Focus on key responsibilities and required experience.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || 'Failed to generate description.';
  } catch (error) {
    console.error('Error generating description:', error);
    return 'Could not generate description at this time.';
  }
};

export const extractSkills = async (description: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `List the top 5 essential technical skills from this job description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skills: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["skills"]
        }
      }
    });
    
    if (response.text) {
        const data = JSON.parse(response.text);
        return data.skills || [];
    }
    return [];
  } catch (error) {
    console.error('Error extracting skills:', error);
    return [];
  }
};
