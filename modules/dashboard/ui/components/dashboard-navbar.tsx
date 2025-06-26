"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCommand from "./dasboard-command";

export default function DashboardNavbar() {
	const { state, toggleSidebar, isMobile } = useSidebar();
	const [commandOpen, setCommandOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setCommandOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<>
			<DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
			<nav className="flex px-4 gap-x-2 bg-background py-3 items-center border-b">
				<Button value="outline" className="size-9" onClick={toggleSidebar}>
					{state === "collapsed" || isMobile ? (
						<PanelLeftIcon className="size-4" />
					) : (
						<PanelLeftCloseIcon className="size-4" />
					)}
				</Button>

				<Button
					className="justify-start font-normal text-muted-foreground hover:text-muted-foreground h-9 w-[240px]"
					variant="outline"
					size={"sm"}
					onClick={() => setCommandOpen((open) => !open)}
				>
					<SearchIcon />
					Search
					<kbd className="ml-auto pointer-events-none inline-flex items-center gap-1 h-5 select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
						<span className="">&#8984;</span>
						<span className="text-xs">K</span>
					</kbd>
				</Button>
			</nav>
		</>
	);
}
