import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Nav from "@/components/Nav/Nav";
import SummarizationContent from "@/components/SummarizationContent/SummarizationContent";

const summarization = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}
      <div className="w-full">
        <Nav />
        <SummarizationContent />
      </div>
    </SidebarProvider>
  );
};

export default summarization;
