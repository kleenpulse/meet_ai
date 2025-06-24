"use client";

import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
	{
		icon: VideoIcon,
		label: "Meetings",
		href: "/meetings",
	},
	{
		icon: BotIcon,
		label: "Agents",
		href: "/agents",
	},
];
const secondSection = [
	{
		icon: StarIcon,
		label: "Upgrade",
		href: "/upgrade",
	},
];

export default function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<div className="absolute inset-0  size-full bg-whitex bg-[linear-gradient(to_right,#012b22_1px,transparent_1px),linear-gradient(to_bottom,#01221b_1px,transparent_1px)] bg-[size:7px_7px] opacity-20" />
			<SidebarHeader>
				<h1 className="text-sidebar-accent-foreground">
					<Link href="/" className="flex items-center gap-2 px-2 pt-2">
						<Image
							src="/logo.svg"
							alt="Vibe AI"
							height={36}
							width={36}
							className="invert"
						/>
						<span className="text-2xl font-bold text-white">Vibe.AI</span>
					</Link>
				</h1>
			</SidebarHeader>
			<div className="px-4 py-2">
				<Separator className="opacity-10 text-[#5d6b68]" />
			</div>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{firstSection.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										className={cn(
											"h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 data-[active=true]:bg-linear-to-r/oklch data-[active=true]:border-[#5d6b68]/10"
										)}
										isActive={pathname === item.href}
									>
										<Link href={item.href}>
											<item.icon className=" size-5" />
											<span className="text-sm tracking-tight font-medium">
												{item.label}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<div className="px-4 py-2">
					<Separator className="opacity-10 text-[#5d6b68]" />
				</div>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{secondSection.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										className={cn(
											"h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 data-[active=true]:bg-linear-to-r/oklch data-[active=true]:border-[#5d6b68]/10"
										)}
										isActive={pathname === item.href}
									>
										<Link href={item.href}>
											<item.icon className=" size-5" />
											<span className="text-sm tracking-tight font-medium">
												{item.label}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="text-white">
				<DashboardUserButton pathname={pathname} />
			</SidebarFooter>
		</Sidebar>
	);
}
