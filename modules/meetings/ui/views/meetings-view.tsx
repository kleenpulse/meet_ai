"use client";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../component/columns";
import EmptyState from "@/components/empty-state";
import { useRouter } from "@bprogress/next/app";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import DataPagination from "@/components/data-pagination";

export default function MeetingsView() {
	const router = useRouter();
	const [filters, setFilters] = useMeetingsFilters();
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.meetings.getMany.queryOptions({ ...filters })
	);

	return (
		<div className="pb-4 px-4 flex-1 md:px-8 flex flex-col gap-y-4">
			<DataTable
				data={data.items}
				columns={columns}
				onRowClick={(row) => router.push(`/meetings/${row.id}`)}
			/>
			<DataPagination
				page={filters.page}
				totalPages={data.totalPages}
				onPageChange={(page) => setFilters({ page })}
			/>
			{data.items.length === 0 && (
				<EmptyState
					title="No meetings, Create your first meeting"
					description="You have not created any meetings yet."
				/>
			)}
		</div>
	);
}
