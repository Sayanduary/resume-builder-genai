// src/services/ai.service.js
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
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
    .describe(
      "The match score between the candidate and the job describe, on a scale of 0 to 100",
    ),
  technicalQuetions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The Technical quetion can be asked in the interview"),
        intention: z
          .string()
          .describe("The Intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question,what points to cover,what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention",
    ),
  behaviorQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The Technical quetion can be asked in the interview"),
        intention: z
          .string()
          .describe("The Intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question,what points to cover,what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview alning with their intention and how to answer them",
    ),
  skillGap: z.array(
    z.object({
      skill: z.string().describe("The skill which the candidate is lacking"),
      severity: z
        .enum(["low", "medium", "high"])
        .describe(
          "The severity of the skill gap, whether it is low, medium, or high",
        ),
    }),
  ),
  preparationPlan: z
    .array(
      z.object({
        day: z.string().describe("The day of the preparation plan"),
        tasks: z.array(z.string()).describe("The tasks to be done on that day"),
        focus: z.array(z.string()).describe("The focus areas for that day"),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to prepare for the interview",
    ),
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an expert career coach. Based on the following information, generate a comprehensive interview report for the candidate:

1. Job describe:
${jobDescription}

2. Candidate's Resume:
${resume}

3. Candidate's Self-description:
${selfDescription}

The interview report should include the following sections:

1. Match Score: Provide a match score between the candidate and the job describe on a scale of 0 to 100.

2. Technical Questions: List potential technical questions that could be asked in the interview, along with the intention behind each question and how the candidate should approach answering them.

3. Behavioral Questions: List potential behavioral questions that could be asked in the interview, along with the intention behind each question and how the candidate should approach answering them.

4. Skill Gaps: Identify any skill gaps that the candidate may have in relation to the job requirements, and categorize them as low, medium, or high severity.

5. Preparation Plan: Provide a day-wise preparation plan for the candidate to prepare for the interview, including specific tasks and focus areas for each day.

Return only valid JSON. Do not include markdown code fences.`;

  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    const rawText = response?.text;
    if (!rawText) {
      throw new Error("No response generated");
    }

    const parsed = JSON.parse(rawText);
    return interviewReportSchema.parse(parsed);
  } catch (error) {
    console.error("Gemini interview report error:", error.message);
    throw new Error("Interview report generation failed");
  }
}

export { generateAIResponse as invokeGeminiAI };
