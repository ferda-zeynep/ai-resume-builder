"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} antialiased`}
          suppressHydrationWarning={true}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {isHomePage ? (
              <main className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
                {children}
              </main>
            ) : (
              <SidebarProvider>
                <TooltipProvider>
                  <div className="flex min-h-screen w-full transition-colors duration-300 bg-background text-foreground">
                    <AppSidebar />
                    <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                      <div className="flex items-center mb-6">
                        <SidebarTrigger className="hover:bg-accent transition-colors" />
                      </div>
                      {children}
                    </main>
                  </div>
                </TooltipProvider>
              </SidebarProvider>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
