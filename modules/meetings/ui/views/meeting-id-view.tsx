"use client";

import { useTRPC } from "@/trpc/client";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "../component/meeting-id-view-header";
import { useRouter } from "@bprogress/next/app";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateMeetingDialog from "../component/update-meeting-dialog";
import { useState } from "react";
import UpcomingState from "../component/upcoming-state";
import ActiveState from "../component/active-state";
import CancelledState from "../component/cancelled-state";
import ProcessingState from "../component/processing-state";

interface Props {
	meetingId: string;
}

export default function MeetingIdView({ meetingId }: Props) {
	const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const router = useRouter();
	const { data } = useSuspenseQuery(
		trpc.meetings.getOne.queryOptions({ id: meetingId })
	);

	const removeMeeting = useMutation(
		trpc.meetings.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
				router.push("/meetings");
			},
			onError: (error) => {
				toast.error("Error removing meeting: " + error.message);
			},
		})
	);

	const [RemoveConfirmation, confirmRemove] = useConfirm({
		title: "Are you sure?",
		description: `The following action will remove ${data.name} meeting, This action cannot be undone.`,
	});

	const handleRemoveMeeting = async () => {
		const ok = await confirmRemove();
		if (!ok) return;
		await removeMeeting.mutateAsync({ id: meetingId });
	};

	const isActive = data?.status === "active";
	const isUpcoming = data?.status === "upcoming";
	const isCancelled = data?.status === "cancelled";
	const isCompleted = data?.status === "completed";
	const isProcessing = data?.status === "processing";

	return (
		<>
			<RemoveConfirmation />
			<UpdateMeetingDialog
				open={updateMeetingDialogOpen}
				onOpenChange={setUpdateMeetingDialogOpen}
				initialValues={data}
			/>
			<div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
				<MeetingIdViewHeader
					meetingId={meetingId}
					meetingName={data?.name}
					onEdit={() => setUpdateMeetingDialogOpen(true)}
					onRemove={() => handleRemoveMeeting()}
				/>
				{isCancelled && <CancelledState />}
				{isCompleted && <div>[Completed]</div>}
				{isProcessing && <ProcessingState />}

				{isActive && <ActiveState meetingId={meetingId} />}
				{isUpcoming && (
					<UpcomingState
						meetingId={meetingId}
						onCancelMeeting={handleRemoveMeeting}
						isCancelling={false}
					/>
				)}
			</div>
		</>
	);
}
