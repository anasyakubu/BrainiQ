import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

const prompt = `Attached is an image of a study material.  
Review the study material and identify key concepts or topics that are particularly significant or complex. Then summarize the material in 100 words. You may increase the word limit if the material spans multiple pages.  
Avoid including unnecessary details like author names, dates, or unrelated information. Ensure your summary highlights key points, numerical data (if relevant), and essential details, including the title of the study material.  
## Summary: `;

export async function POST(req: Request, res: Response) {
  const { base64 } = await req.json();
  const filePart = fileToGenerativePart(base64);

  console.log(filePart);
  const generatedContent = await model.generateContent([prompt, filePart]);

  console.log(generatedContent);
  const textResponse =
    generatedContent.response.candidates![0].content.parts[0].text;
  return new Response(textResponse, { status: 200 });
}

function fileToGenerativePart(imageData: string) {
  return {
    inlineData: {
      data: imageData.split(",")[1],
      mimeType: imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.lastIndexOf(";")
      ),
    },
  };
}
