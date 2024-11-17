import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
// import { Message, OpenAIStream, StreamData, StreamingTextResponse } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message, StreamData, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;
// export const runtime = 'edge';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GEMINI_API_KEY,
});

// gemini-1.5-pro-latest
// gemini-1.5-pro-exp-0801
const model = google("models/gemini-1.5-pro-latest", {
  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  console.log(reqBody);

  const messages: Message[] = reqBody.messages;
  const userQuestion = `${messages[messages.length - 1].content}`;

  const reportData: string = reqBody.data.reportData;
  const query = `Represent this for searching relevant passages: patient medical report says: \n${reportData}. \n\n${userQuestion}`;

  const retrievals = await queryPineconeVectorStore(
    pinecone,
    "index-one",
    "textspace1",
    query
  );

  const finalPrompt = `This task involves summarizing a study material and responding to a user query. Additional general insights are provided to enhance the response but may not directly relate to the user's study context.  

Your task is to:  
1. Analyze the provided study material and the user's query.  
2. Reference the general insights only if they are relevant to the user's query or study material.  
3. Ensure the response is factually accurate and showcases a deep understanding of the query and the study material.  

Note: The general insights are supplementary and are not part of the specific study material. Do not include them if they are irrelevant to the user's context.  

\n\n**Study Material Summary:**\n${reportData}  
\n**End of Study Material**  

\n\n**User Query:**\n${userQuestion}  
\n**End of User Query**  

\n\n**General Insights:**\n${retrievals}  
\n**End of General Insights**  

\n\nProvide a detailed explanation and justification for your response.  
\n\n**Answer:**  
`;

  const data = new StreamData();
  data.append({
    retrievals: retrievals,
  });

  const result = await streamText({
    model: model,
    prompt: finalPrompt,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
