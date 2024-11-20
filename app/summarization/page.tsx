import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const summarization = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger /> <div className="summarization">summarization</div>{" "}
    </SidebarProvider>
  );
};

export default summarization;
