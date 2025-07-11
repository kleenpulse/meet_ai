import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	ChevronRight,
	MoreVerticalIcon,
	PencilIcon,
	TrashIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
	agentId: string;
	agentName: string;
	onEdit: () => void;
	onRemove: () => void;
}

export default function AgentIdViewHeader({
	agentId,
	agentName,
	onEdit,
	onRemove,
}: Props) {
	return (
		<div className="flex items-center justify-between">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild className="font-medium text-xl">
							<Link href="/agents">My Agents</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
						<ChevronRight />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className="font-medium text-xl text-foreground"
						>
							<span>{agentName}</span>
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{/* WITHOUT model={false}, THE DIALOG THAT THIS DROPDOWN OPENS CAUSES THE WEBSITE TO FREEZE */}
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost">
						<MoreVerticalIcon />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={onEdit}>
						<PencilIcon className="size-4 text-black" /> Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onRemove}>
						<TrashIcon className="size-4 text-black" /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
