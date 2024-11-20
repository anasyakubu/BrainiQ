import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardContent from "@/components/DashboardContent/DashboardContent";
import Nav from "@/components/Nav/Nav";

const dashboard = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Nav />
          {/* <SidebarTrigger /> */}
          <DashboardContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default dashboard;
