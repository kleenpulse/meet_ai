"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "@bprogress/next/app";
import { DataTable } from "@/components/data-table";

export default function AgentsView() {
	const router = useRouter();

	const [filters, setFilters] = useAgentsFilters();

	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.agents.getMany.queryOptions({ ...filters })
	);

	return (
		<div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
			<DataTable
				data={data.items}
				columns={columns}
				onRowClick={(row) => router.push(`/agents/${row.id}`)}
			/>
			<DataPagination
				page={filters.page}
				totalPages={data.totalPages}
				onPageChange={(page) => setFilters({ page })}
			/>

			{data.items.length === 0 && (
				<EmptyState
					title="No agents"
					description="You have not created any agents yet."
				/>
			)}
		</div>
	);
}
