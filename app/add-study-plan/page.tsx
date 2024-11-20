import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Nav from "@/components/Nav/Nav";
import AddStudyPlan from "@/components/AddStudyPlan";

const addStudyPlan = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}
      <div className="w-full">
        <Nav />
        <AddStudyPlan />
      </div>
    </SidebarProvider>
  );
};

export default addStudyPlan;
