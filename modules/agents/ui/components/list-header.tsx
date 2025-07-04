"use client";

import { Button } from "@/components/ui/button";
import { Plus, XCircleIcon } from "lucide-react";
import NewAgentDialog from "./new-agent-dialog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import AgentSearchFilters from "./agents-search-filters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function ListHeader() {
	const [filters, setFilters] = useAgentsFilters();
	const [isOpen, setIsOpen] = useState(false);

	const isAnyFilterModified = !!filters.search;

	const onClearFilters = () => {
		setFilters({
			search: "",
			page: DEFAULT_PAGE,
		});
	};

	return (
		<>
			<NewAgentDialog onOpenChange={setIsOpen} open={isOpen} />
			<div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
				<div className="flex items-center justify-between">
					<h5 className="font-medium text-xl">My Agents</h5>
					<Button onClick={() => setIsOpen(true)}>
						<Plus />
						New Agent
					</Button>
				</div>
				<ScrollArea>
					<div className="flex items-center gap-x-2 p-1">
						<AgentSearchFilters />
						{isAnyFilterModified && (
							<Button variant={"outline"} size="sm" onClick={onClearFilters}>
								<XCircleIcon />
								clear
							</Button>
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	);
}
