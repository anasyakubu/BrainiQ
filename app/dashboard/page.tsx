import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardContent from "@/components/DashboardContent/DashboardContent";

const dashboard = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="w-full">
          <DashboardContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default dashboard;
