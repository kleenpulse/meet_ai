"use client";

import { Button } from "@/components/ui/button";
import { Plus, XCircleIcon } from "lucide-react";

import { useState } from "react";
import { DEFAULT_PAGE } from "@/constants";
import NewMeetingDialog from "./new-meeting-dialog";
import MeetingsSearchFilters from "./meetings-search-filters";
import StatusFilters from "./status-filters";
import AgentIdFilter from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function MeetingsListHeader() {
	const [filters, setFilters] = useMeetingsFilters();
	const [isOpen, setIsOpen] = useState(false);

	const isAnyFilterModified =
		!!filters.search || !!filters.status || !!filters.agentId;

	const onClearFilters = () => {
		setFilters({
			page: DEFAULT_PAGE,
			search: "",
			status: null,
			agentId: "",
		});
	};

	return (
		<>
			<NewMeetingDialog open={isOpen} onOpenChange={setIsOpen} />
			<div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
				<div className="flex items-center justify-between">
					<h5 className="font-medium text-xl">My Meetings</h5>
					<Button onClick={() => setIsOpen(true)}>
						<Plus />
						New Meeting
					</Button>
				</div>
				<ScrollArea>
					<div className="flex items-center gap-x-2 p-1">
						<MeetingsSearchFilters />
						<StatusFilters />
						<AgentIdFilter />
						{isAnyFilterModified ? (
							<Button variant={"outline"} onClick={onClearFilters}>
								<XCircleIcon className="size-4" />
							</Button>
						) : null}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	);
}
