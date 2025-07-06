import ResponsiveDialog from "@/components/responsive-dialog";
import React from "react";
import { MeetingGetMany } from "../../types";
import MeetingForm from "./meeting-form";

interface UpdateMeetingDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: MeetingGetMany[number];
}

export default function UpdateMeetingDialog({
	open,
	onOpenChange,
	initialValues,
}: UpdateMeetingDialogProps) {
	return (
		<ResponsiveDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Edit Meeting"
			description="Edit meeting details"
		>
			<MeetingForm
				onSuccess={() => onOpenChange(false)}
				onCancel={() => onOpenChange(false)}
				initialValues={initialValues}
			/>
		</ResponsiveDialog>
	);
}
