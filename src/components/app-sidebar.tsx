"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  BarChart,
  FileText,
  Edit,
  Tag,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarNavMain } from "./main-sidebar-nav"; 

// This is sample data.
const data = {
  admin: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          icon: Home,
          url: "/admin/dashboard",
        },
        {
          title: "Analytics",
          icon: BarChart,
          url: "/admin/analytics",
        },
      ],
    },
    {
      title: "Content Management",
      items: [
        {
          title: "All Posts",
          icon: FileText,
          url: "/admin/posts",
        },
        {
          title: "Add New Post",
          icon: Edit,
          url: "/admin/posts/create",
        },
        {
          title: "Categories",
          icon: Layers,
          url: "/admin/category",
        },
        {
          title: "Tags",
          icon: Tag,
          url: "/admin/tags",
        },
        {
          title: "Comments",
          icon: MessageSquare,
          url: "/admin/comments",
        },
      ],
    },
    {
      title: "User Management",
      items: [{ title: "Users", icon: Users, url: "/admin/users" }],
    },
    {
      title: "Settings",
      items: [
        {
          title: "General Settings",
          icon: Settings,
          url: "/admin/settings",
        },
        { title: "Logout", icon: LogOut, url: "/logout" },
      ],
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMain section={data.admin} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
