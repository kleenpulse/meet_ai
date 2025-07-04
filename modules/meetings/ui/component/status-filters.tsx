import React from "react";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { MeetingStatus } from "../../types";
import {
	CircleCheckIcon,
	CircleXIcon,
	ClockArrowUpIcon,
	Loader2Icon,
	VideoIcon,
} from "lucide-react";
import CommandSelect from "@/components/command-select";

const options = [
	{
		id: MeetingStatus.Upcoming,
		value: MeetingStatus.Upcoming,
		children: (
			<div className="flex items-center gap-x-2 capitalize">
				<CircleCheckIcon />
				{MeetingStatus.Upcoming}
			</div>
		),
	},
	{
		id: MeetingStatus.Completed,
		value: MeetingStatus.Completed,
		children: (
			<div className="flex items-center gap-x-2 capitalize">
				<ClockArrowUpIcon />
				{MeetingStatus.Completed}
			</div>
		),
	},
	{
		id: MeetingStatus.Active,
		value: MeetingStatus.Active,
		children: (
			<div className="flex items-center gap-x-2 capitalize">
				<VideoIcon />
				{MeetingStatus.Active}
			</div>
		),
	},
	{
		id: MeetingStatus.Processing,
		value: MeetingStatus.Processing,
		children: (
			<div className="flex items-center gap-x-2 capitalize">
				<Loader2Icon />
				{MeetingStatus.Processing}
			</div>
		),
	},
	{
		id: MeetingStatus.Cancelled,
		value: MeetingStatus.Cancelled,
		children: (
			<div className="flex items-center gap-x-2 capitalize">
				<CircleXIcon />
				{MeetingStatus.Cancelled}
			</div>
		),
	},
];

export default function StatusFilters() {
	const [filters, setFilters] = useMeetingsFilters();

	return (
		<CommandSelect
			options={options}
			placeholder="Status"
			className="h-9"
			onSelect={(value) => setFilters({ status: value as MeetingStatus })}
			value={filters.status ?? ""}
		/>
	);
}
