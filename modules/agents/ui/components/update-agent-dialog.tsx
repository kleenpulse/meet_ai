import ResponsiveDialog from "@/components/responsive-dialog";
import React from "react";
import AgentForm from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: AgentGetOne;
}

export default function UpdateAgentDialog({
	open,
	onOpenChange,
	initialValues,
}: UpdateAgentDialogProps) {
	return (
		<ResponsiveDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Edit Agent"
			description="Edit agent details"
		>
			<AgentForm
				onSuccess={() => onOpenChange(false)}
				onCancel={() => onOpenChange(false)}
				initialValues={initialValues}
			/>
		</ResponsiveDialog>
	);
}
