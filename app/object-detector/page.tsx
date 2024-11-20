"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Nav from "@/components/Nav/Nav";
import ObjectDetectorContent from "@/components/ObjectDetectorContent/ObjectDetectorContent";

export default function Object() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-full">
        <Nav />
        <ObjectDetectorContent />
      </div>
    </SidebarProvider>
  );
}
