import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
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
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Find a meeting or agent" />
			<CommandList>
				<CommandItem>[Test]</CommandItem>
			</CommandList>
		</CommandDialog>
	);
}
