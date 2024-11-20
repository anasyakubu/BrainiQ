import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import StudyPlanContent from "../../components/studyPlanContent/studyPlanContent";

const studyPlan = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />{" "}
      <div className="w-full">
        <StudyPlanContent />
      </div>{" "}
    </SidebarProvider>
  );
};

export default studyPlan;
