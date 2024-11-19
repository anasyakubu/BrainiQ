import React from "react";
import BentoGridSection from "../BentoGridSection";

const DashboardContent = () => {
  return (
    <div className="DashboardContent">
      <div className="mt-10">
        <div className="">
          <h2 className="text-xl font-bold">Welcome Back, Anas 👋</h2>
        </div>
        <div className="mt-5">
          <BentoGridSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
