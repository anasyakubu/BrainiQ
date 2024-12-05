import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/spinner";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// const inter = Inter({ subsets: ["latin"] });
// const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrainiQ",
  description:
    "A Web-Based AI-Powered Study Partner for Individuals with Special Needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Script src="../node_modules/preline/dist/preline.js"></Script>
        <body className={`font-nunito-eb`}>
          <ClerkLoading>
            <div className="flex flex-col items-center text-center mt-32">
              <Spinner />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
