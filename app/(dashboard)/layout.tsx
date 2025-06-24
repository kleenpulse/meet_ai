import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import React from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main className="flex flex-col h-dvh w-screen bg-muted">{children}</main>
		</SidebarProvider>
	);
}
