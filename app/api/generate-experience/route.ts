import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "HF API Key missing" },
        { status: 500 },
      );
    }

    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `[INST] Write 3 professional resume bullet points for a ${title} position. Provide ONLY the points as a clean list without introduction. [/INST]`,
      parameters: { max_new_tokens: 300, return_full_text: false },
    });

    return NextResponse.json({ result: response.generated_text });
  } catch (error: any) {
    console.error("HF Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
