import { authClient } from "@/lib/auth-client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import GeneratedAvatar from "@/components/generated-avatar";
import { ChevronDown, CreditCard, LogOut } from "lucide-react";
import { useRouter } from "@bprogress/next/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export default function DashboardUserButton({
	pathname,
}: {
	pathname: string;
}) {
	const router = useRouter();
	const isMobile = useIsMobile();
	const { data, isPending } = authClient.useSession();

	const onLogout = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push(`/sign-in?callbackURL=${pathname}`);
				},
			},
		});
	};

	if (isPending || !data?.user) return null;

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-2">
					{data.user.image ? (
						<Avatar>
							<AvatarImage
								src={data.user.image}
								alt={data.user.name || "User Avatar"}
							/>
							<AvatarFallback>
								{data.user.name?.charAt(0) || "U"}
							</AvatarFallback>
						</Avatar>
					) : (
						<GeneratedAvatar
							seed={data.user.name || "user"}
							className="size-9 mr-3"
							variant="initials"
						/>
					)}

					<div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
						<p className="text-sm truncate w-full">{data.user.name}</p>
						<p className="text-xs text-muted truncate w-full">
							{data.user.email}
						</p>
					</div>
					<ChevronDown className="size-4 shrink-0" />
				</DrawerTrigger>

				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{data.user.name}</DrawerTitle>
						<DrawerDescription>{data.user.email}</DrawerDescription>
					</DrawerHeader>

					<DrawerFooter>
						<Button variant="outline" className="">
							Billing
							<CreditCard className="size-4 text-black" />
						</Button>
						<Button variant="outline" onClick={onLogout}>
							Logout
							<LogOut className="size-4 text-black" />
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-2">
				{data.user.image ? (
					<Avatar>
						<AvatarImage
							src={data.user.image}
							alt={data.user.name || "User Avatar"}
						/>
						<AvatarFallback>{data.user.name?.charAt(0) || "U"}</AvatarFallback>
					</Avatar>
				) : (
					<GeneratedAvatar
						seed={data.user.name || "user"}
						className="size-9 mr-3"
						variant="initials"
					/>
				)}

				<div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
					<p className="text-sm truncate w-full">{data.user.name}</p>
					<p className="text-xs text-muted truncate w-full">
						{data.user.email}
					</p>
				</div>
				<ChevronDown className="size-4 shrink-0" />
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" side="right" className="w-72">
				<DropdownMenuLabel>
					<div className="flex flex-col gap-1">
						<span className="font-medium truncate">{data.user.name}</span>
						<span className="text-sm text-muted-foreground truncate font-normal">
							{data.user.email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer flex items-center justify-between">
					Billing
					<CreditCard className="size-4 shrink-0" />
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={onLogout}
					className="cursor-pointer flex items-center justify-between"
				>
					Logout
					<LogOut className="size-4 shrink-0" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
