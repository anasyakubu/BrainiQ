import {
  Home,
  User2,
  ScanFace,
  ChevronUp,
  Bot,
  BotMessageSquare,
  Speech,
  NotebookPen,
  Presentation,
} from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import Image from "next/image";
import logo from "../assets/logo-tans-ll.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Chatbot", url: "/chatbot", icon: Bot },
  { title: "Chat PDF", url: "/chatpdf", icon: BotMessageSquare },
  { title: "Study Plan", url: "/study-plan", icon: Presentation },
  { title: "Text to Speech", url: "/lingua-speak", icon: Speech },
  { title: "Object Detector", url: "/object-detector", icon: ScanFace },
  { title: "Text Summarizer", url: "/summarization", icon: NotebookPen },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            <Image src={logo} className="w-32" alt="logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-3">
                    <a
                      href={item.url}
                      className="text-xl mb-5 mt-5 font-semibold"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> anasyakubu
                  <ChevronUp className="ml-auto" />
                  {/* <ModeToggle /> */}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
