import { getQueryClient, trpc } from "@/trpc/server";
import LoadingState from "@/components/loading-state";
import AgentsView from "@/modules/agents/ui/views/agents-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ErrorState from "@/components/error-state";
import ListHeader from "@/modules/agents/ui/components/list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
	searchParams: Promise<SearchParams>;
}

export default async function Agents({ searchParams }: Props) {
	const filters = await loadSearchParams(searchParams);

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) redirect("/sign-in?callbackURL=/agents");
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.agents.getMany.queryOptions({ ...filters })
	);

	return (
		<>
			<ListHeader />
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
		</>
	);
}
