import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo-tans-l.png";
import { Home } from "lucide-react";

const Nav = () => {
  return (
    <div className="Nav w-full">
      <div className="">
        <header className="sticky top-0 z-10 flex h-[65px] bg-background items-center gap-1 border-b px-4">
          <h1 className="w-full text-xl font-bold">
            <span className="flex">
              <SidebarTrigger />
              <span className="text-2xl">BrainiQ</span>
            </span>
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
                {/* <ChatbotComponent onReportConfirmation={onReportConfirmation} /> */}
              </DrawerContent>
            </Drawer>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Nav;
