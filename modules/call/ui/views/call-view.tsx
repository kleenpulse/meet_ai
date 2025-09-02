"use client";

import ErrorState from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import CallProvider from "../component/call-provider";

interface Props {
	meetingId: string;
}
export default function CallView({ meetingId }: Props) {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.meetings.getOne.queryOptions({ id: meetingId })
	);
	if (data.status === "completed") {
		return (
			<div className="flex h-dvh items-center justify-center">
				<ErrorState
					title="Meeting completed"
					description="This meeting was completed"
				/>
			</div>
		);
	}

	return (
		<div>
			<CallProvider meetingId={meetingId} meetingName={data.name} />
		</div>
	);
}
