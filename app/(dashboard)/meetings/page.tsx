import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { auth } from "@/lib/auth";
import MeetingsListHeader from "@/modules/meetings/ui/component/meetings-list-header";
import MeetingsView from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/meetings/params";

interface Props {
	searchParams: Promise<SearchParams>;
}

export default async function MeetingsPage({ searchParams }: Props) {
	const filters = await loadSearchParams(searchParams);

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) redirect("/sign-in?callbackURL=/meetings");
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.meetings.getMany.queryOptions({ ...filters })
	);

	return (
		<>
			<MeetingsListHeader />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense
					fallback={
						<LoadingState
							title="Loading meetings"
							description="This may take a few seconds"
						/>
					}
				>
					<ErrorBoundary
						fallback={
							<ErrorState
								title="Error loading meetings"
								description="Something went wrong."
							/>
						}
					>
						<MeetingsView />
					</ErrorBoundary>
				</Suspense>
			</HydrationBoundary>
		</>
	);
}
