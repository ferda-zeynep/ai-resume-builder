"use server";

import { HfInference } from "@huggingface/inference";
import { useToken } from "./tokens";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

/**
 * Extracts a JSON array of strings from the AI output.
 */
function extractJsonArray(text: string): string[] {
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return Array.isArray(parsed) ? parsed : [];
    }

    return text
      .split("\n")
      .map((s) => s.replace(/^\d+\.\s*|^\-\s*/, "").trim())
      .filter((s) => s.length > 50);
  } catch (error) {
    console.error("Critical Parse Error in AI response cleaning:", error);
    return [];
  }
}

/**
 * Generates professional resume summaries.
 */
export async function generateSummaryAI(jobTitle: string): Promise<string[]> {
  try {
    await useToken();
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `[INST] Act as an expert career coach and professional resume writer. Job Title: ${jobTitle}. Write 3 DIFFERENT and HIGHLY DETAILED, lengthy paragraphs for a resume summary. Each summary must be professional and at least 3 sentences long, describing key achievements and skills. Return ONLY as a valid JSON array of strings. Format example: ["Summary option 1 paragraph...", "Summary option 2 paragraph...", "Summary option 3 paragraph..."] [/INST]`,
      parameters: {
        max_new_tokens: 900,
        temperature: 0.7,
        return_full_text: false,
      },
    });

    const results = extractJsonArray(response.generated_text);

    return results.length > 0
      ? results
      : [
          `Results-driven and seasoned ${jobTitle} with a proven track record of spearheading complex projects from conception to completion. Highly adept at optimizing operational workflows, fostering cross-functional team collaboration, and delivering innovative, cost-effective solutions in fast-paced environments. Expert in strategic planning, technical leadership, and driving significant efficiency improvements.`,
          `Accomplished and innovative ${jobTitle} dedicated to leveraging technical expertise to achieve organizational goals. Skilled in developing scalable architectures, implementing data-driven strategies, and mentoring junior talent. Possesses a strong analytical mindset and excels at transforming business requirements into impactful, high-performance technical outcomes.`,
          `Dedicated and highly specialized ${jobTitle} with extensive experience in driving process optimization and market-leading solutions. Recognized for strategic foresight and technical acumen, consistently improving key performance metrics and delivering exceptional product quality. Proactive leader focused on continuous improvement and operational excellence.`,
        ];
  } catch (error) {
    console.error("Summary AI Generation Failed, using safe fallbacks:", error);
    return [
      `Professional summary focusing on career achievements as a ${jobTitle}.`,
      `Dedicated specialist with years of industry experience and technical leadership.`,
    ];
  }
}

/**
 * Generates professional skills.
 */
export async function generateSkillsAI(query: string): Promise<string[]> {
  try {
    await useToken();
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `[INST] List 6 top professional technical and soft skills for a ${query} to include on a resume. Return ONLY as a valid JSON list of strings. Format: ["skill1", "skill2", ...] [/INST]`,
      parameters: { max_new_tokens: 200, return_full_text: false },
    });
    const results = extractJsonArray(response.generated_text);
    return results.length > 0
      ? results
      : [
          "Analytical Thinking",
          "Problem Solving",
          "Communication",
          "Leadership",
          "Technical Proficiency",
          "Teamwork",
          "Project Management",
          "Collaboration",
        ];
  } catch (error) {
    console.error("Skills AI Generation Failed, using safe fallbacks:", error);
    return [
      "Adaptability",
      "Collaboration",
      "Strategic Planning",
      "Presentation Skills",
    ];
  }
}

/**
 * Generates professional work experience points.
 */
export async function generateExperienceAI(
  jobTitle: string,
): Promise<string[]> {
  try {
    await useToken();
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `[INST] Act as an expert career coach. Role: ${jobTitle}. Generate 3 powerful, result-oriented, and lengthy professional achievement bullet points for a resume. Each point must describe a specific success, impact, or metric. Return ONLY as a valid JSON list of strings. [/INST]`,
      parameters: { max_new_tokens: 700, return_full_text: false },
    });
    const results = extractJsonArray(response.generated_text);

    return results.length > 0
      ? results
      : [
          `Successfully spearheaded the migration of core systems to cloud architecture, resulting in a 40% reduction in infrastructure costs and achieving 99.99% uptime.`,
          `Developed and implemented an automated testing framework that slashed release cycles by 60% and improved overall code coverage by 30%, significantly accelerating product delivery.`,
          `Initiated and managed a cross-functional process improvement initiative that optimized operational efficiency, leading to a 25% increase in team productivity and substantial cost savings.`,
        ];
  } catch (error) {
    console.error(
      "Experience AI Generation Failed, using safe fallbacks:",
      error,
    );
    return [
      `Led key projects and collaborated with team members to achieve project goals for ${jobTitle}.`,
      `Optimized operational workflows resulting in improved overall productivity.`,
    ];
  }
}
