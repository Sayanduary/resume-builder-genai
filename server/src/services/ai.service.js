// src/services/ai.service.js
import { Behavior, GoogleGenAI } from "@google/genai";
import { config, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .description(
      "The match score between the candidate and the job description, on a scale of 0 to 100",
    ),
  technicalQuetions: z
    .array(
      z.object({
        question: z
          .string()
          .description("The Technical quetion can be asked in the interview"),
        intention: z
          .string()
          .description(
            "The Intention of interviewer behind asking this question",
          ),
        answer: z
          .string()
          .description(
            "How to answer this question,what points to cover,what approach to take etc.",
          ),
      }),
    )
    .description(
      "Technical questions that can be asked in the interview along with their intention",
    ),
  behaviorQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .description("The Technical quetion can be asked in the interview"),
        intention: z
          .string()
          .description(
            "The Intention of interviewer behind asking this question",
          ),
        answer: z
          .string()
          .description(
            "How to answer this question,what points to cover,what approach to take etc.",
          ),
      }),
    )
    .description(
      "Behavioral questions that can be asked in the interview alning with their intention and how to answer them",
    ),
  skillGap: z.array(
    z.object({
      skill: z.string().description("The skill which the candidate is lacking"),
      severity: z
        .enum(["low", "medium", "high"])
        .description(
          "The severity of the skill gap, whether it is low, medium, or high",
        ),
    }),
  ),
  preparationPlan: z
    .array(
      z.object({
        day: z.string().description("The day of the preparation plan"),
        tasks: z
          .array(z.string())
          .description("The tasks to be done on that day"),
        focus: z.array(z.string()).description("The focus areas for that day"),
      }),
    )
    .description(
      "A day-wise preparation plan for the candidate to prepare for the interview",
    ),
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "",
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
}

export { generateAIResponse as invokeGeminiAI };
