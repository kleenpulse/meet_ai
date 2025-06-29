import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import AgentIdView from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
	params: Promise<{ agentId: string }>;
}
export default async function AgentPage({ params }: Props) {
	const { agentId } = await params;
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.agents.getOne.queryOptions({ id: agentId })
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense
				fallback={
					<LoadingState
						title="Loading agent"
						description="This may take a few seconds"
					/>
				}
			>
				<ErrorBoundary
					fallback={
						<ErrorState
							title="Error loading agent page"
							description="Something went wrong."
						/>
					}
				>
					<AgentIdView agentId={agentId} />
				</ErrorBoundary>
			</Suspense>
		</HydrationBoundary>
	);
}
