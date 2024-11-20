import React from "react";
import StudyPlanList from "../../components/study-plan-cards";

const studyPlanContent = () => {
  return (
    <div className="studyPlanContent">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold">
            Study <span className="text-[#00B612]">Plan</span>
          </h1>
          <p className="mt-3 text-neutral-400">
            Take your learning journey to the next level with our cutting-edge
            AI Study Partner
          </p>
        </div>

        <div className="mt-5">
          <StudyPlanList />
        </div>
      </div>
    </div>
  );
};

export default studyPlanContent;
