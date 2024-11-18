import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en">
      <Script src="../node_modules/preline/dist/preline.js"></Script>
      <body className={`font-nunito-eb`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
