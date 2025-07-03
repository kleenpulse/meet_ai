"use client";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../component/columns";
import EmptyState from "@/components/empty-state";

export default function MeetingsView() {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

	return (
		<div className="pb-4 px-4 flex-1 md:px-8 flex flex-col gap-y-4">
			<DataTable data={data.items} columns={columns} />
			{data.items.length === 0 && (
				<EmptyState
					title="No meetings, Create your first meeting"
					description="You have not created any meetings yet."
				/>
			)}
		</div>
	);
}
