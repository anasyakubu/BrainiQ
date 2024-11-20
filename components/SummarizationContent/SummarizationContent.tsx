import React from "react";
import Summarize from "../Summarize/Summarize";

const SummarizationContent = () => {
  return (
    <div className="SummarizationContent">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold">
            Summari<span className="text-[#00B612]">zation</span>
          </h1>

          <p className="mt-3 text-neutral-400">
            Break down lengthy textbooks, PDFs, or documents into bite-sized
            summaries
          </p>
          <div className="mt-3">
            <Summarize />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizationContent;
