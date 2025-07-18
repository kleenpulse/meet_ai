import {
	CommandInput,
	CommandItem,
	CommandList,
	CommandResponsiveDialog,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
interface CommandDialogProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardCommand({
	open,
	setOpen,
}: CommandDialogProps) {
	return (
		<CommandResponsiveDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Find a meeting or agent" />
			<CommandList>
				<CommandItem>[Test]</CommandItem>
			</CommandList>
		</CommandResponsiveDialog>
	);
}
