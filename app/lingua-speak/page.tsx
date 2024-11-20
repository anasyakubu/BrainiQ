import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Nav from "@/components/Nav/Nav";
import LinguaSpeakContent from "../../components/LinguaSpeakContent/LinguaSpeakContent";
import React from "react";

const linguaspeak: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}
      <div className="w-full">
        <Nav />
        <LinguaSpeakContent />
      </div>
    </SidebarProvider>
  );
};

export default linguaspeak;
