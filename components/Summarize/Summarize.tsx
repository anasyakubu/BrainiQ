"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
// console.log(apiKey);
export default function Summarize() {
  const genAI = new GoogleGenerativeAI(apiKey);

  const [textPar, setTextPar] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function aiRun() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Summarize the below text : ${textPar}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextPar(e.target.value);
  };

  const handleClick = () => {
    aiRun();
  };

  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Text Summarizer</h1> */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px]"
              placeholder="Paste your text here to summarize... 📋"
              value={textPar}
              onChange={handleChangeSearch}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleClick}
              disabled={loading || textPar.trim() === ""}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                "Summarize"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : aiResponse ? (
              <div className="prose max-w-none">
                <p>{aiResponse}</p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground min-h-[300px] flex items-center justify-center">
                Your summary will appear here...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
