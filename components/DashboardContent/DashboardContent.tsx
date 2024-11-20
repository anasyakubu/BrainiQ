import React from "react";
import BentoGridSection from "../BentoGridSection";

const DashboardContent = () => {
  return (
    <div className="DashboardContent">
      <div className="mt-5">
        <div className="p-5">
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
