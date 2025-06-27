import { getQueryClient, trpc } from "@/trpc/server";
import LoadingState from "@/components/loading-state";
import AgentsView from "@/modules/agents/ui/views/agents-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ErrorState from "@/components/error-state";

export default async function Agents() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense
				fallback={
					<LoadingState
						title="Loading agents"
						description="This may take a few seconds"
					/>
				}
			>
				<ErrorBoundary
					fallback={
						<ErrorState
							title="Error loading agents"
							description="Something went wrong."
						/>
					}
				>
					<AgentsView />
				</ErrorBoundary>
			</Suspense>
		</HydrationBoundary>
	);
}
