import ResponsiveDialog from "@/components/responsive-dialog";
import React from "react";
import MeetingForm from "./meeting-form";
import { useRouter } from "@bprogress/next/app";

interface NewMeetingDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function NewMeetingDialog({
	open,
	onOpenChange,
}: NewMeetingDialogProps) {
	const router = useRouter();

	return (
		<ResponsiveDialog
			open={open}
			onOpenChange={onOpenChange}
			title="New Meeting"
			description="Create a new Meeting"
		>
			<MeetingForm
				onSuccess={(id) => {
					onOpenChange(false);
					router.push(`/meetings/${id}`);
				}}
				onCancel={() => onOpenChange(false)}
			/>
		</ResponsiveDialog>
	);
}
