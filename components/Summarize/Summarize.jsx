"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import "./Summarize.scss";

const Summarize = () => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  const [textPar, setTextPar] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Generative AI Call to fetch text insights
   */
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

  const handleChangeSearch = (e) => {
    setTextPar(e.target.value);
  };

  const handleClick = () => {
    aiRun();
  };

  return (
    <div className="Summarize">
      <div className="p-5">
        <div className="rounded-lg shadow-lg border">
          <div className="p-5 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
            {/* FORM */}
            <div className="formSection">
              {/* <form> */}
              <textarea
                className="w-full p-3 outline-none text-sm  rounded-lg"
                placeholder="Paste Text Here ..📋"
                rows="20"
                onChange={(e) => handleChangeSearch(e)}
              ></textarea>
              <Button
                className="mt-2 bg-[#00B612]"
                onClick={() => handleClick()}
                variant={"secondary"}
                type="submit"
                // size="sm"
              >
                Summarize
              </Button>
              {/* </form> */}
            </div>
            {/* DISPLAY */}
            <div className="displaySection">
              <div className="mt-2 lg:d-none">
                <h6 className="text-lg">Output :</h6>
              </div>
              {loading === true && aiResponse === "" ? (
                <p className="text-sm text-black">Summarizing ...</p>
              ) : (
                <div>
                  <p className="text-sm mt-3 text-black">{aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarize;
