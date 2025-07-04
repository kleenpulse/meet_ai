import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import MeetingIdView from "@/modules/meetings/ui/views/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
	params: Promise<{ meetingId: string }>;
}
export default async function MeetingIdPage({ params }: Props) {
	const { meetingId } = await params;
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.meetings.getOne.queryOptions({ id: meetingId })
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense
				fallback={
					<LoadingState
						title="Loading meeting"
						description="This may take a few seconds"
					/>
				}
			>
				<ErrorBoundary
					fallback={
						<ErrorState
							title="Error loading meeting page"
							description="Something went wrong."
						/>
					}
				>
					<MeetingIdView meetingId={meetingId} />
				</ErrorBoundary>
			</Suspense>
		</HydrationBoundary>
	);
}
