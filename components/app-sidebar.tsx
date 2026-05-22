"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Layers,
  Layout,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Resumes", url: "/dashboard/resumes", icon: FileText },
  { title: "Templates", url: "/dashboard/templates", icon: Layers },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-sky-500 p-2 rounded-lg shadow-lg shadow-sky-500/20">
            <Layout className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black text-sidebar-foreground tracking-tighter uppercase">
            AI RESUME
          </span>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all ${
                          isActive
                            ? "bg-sky-500/10 text-sky-500 font-bold"
                            : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground font-medium"
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${isActive ? "text-sky-500" : "opacity-70"}`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
