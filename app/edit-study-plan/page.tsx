"use client";

import React from "react";
import { useParams } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Nav from "@/components/Nav/Nav";
import EditStudyPlan from "@/components/EditStudyPlan";

const EditStudyPlanPage = () => {
  const params = useParams(); // Extracts dynamic route parameters
  const id = params?.id;

  if (!id) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Nav />
        <EditStudyPlan params={{ id: id as string }} />
      </div>
    </SidebarProvider>
  );
};

export default EditStudyPlanPage;
