"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import { useState } from "react";
import { useChat } from "ai/react";
import ReportComponent from "@/components/ReportComponent";
// import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";
import ChatComponent from "@/components/chatcomponent";

const ChatPDF = () => {
  const { toast } = useToast();

  const [reportData, setreportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Updated!",
    });
  };

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[65px] bg-background items-center gap-1 border-b px-4">
          <h1 className="w-full text-xl font-bold ">
            <span className="flex flex-col">Chat PDF</span>
          </h1>
          <div className="w-full flex flex-row justify-end gap-2">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <main
          className="grid flex-1 gap-4 overflow-auto p-4
        md:grid-cols-2
        lg:grid-cols-3"
        >
          <div className="hidden md:flex flex-col">
            <ReportComponent onReportConfirmation={onReportConfirmation} />
            {/* <SideComponent onReportConfirmation={onReportConfirmation} /> */}
          </div>
          <div className="lg:col-span-2">
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPDF;
