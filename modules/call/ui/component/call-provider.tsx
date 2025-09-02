import { authClient } from "@/lib/auth-client";
import { LoaderIcon } from "lucide-react";
import CallConnect from "./call-connect";
import { generateAvatarUri } from "@/lib/create-avatar";

interface Props {
	meetingId: string;
	meetingName: string;
}

export default function CallProvider({ meetingId, meetingName }: Props) {
	const { data, isPending } = authClient.useSession();

	if (!data || isPending) {
		return (
			<div className="flex h-dvh items-center justify-center bg-radial from-sidebar-accent to-sidebar">
				{" "}
				<LoaderIcon className="animate-spin size-6 text-white" />
			</div>
		);
	}

	return (
		<CallConnect
			meetingId={meetingId}
			meetingName={meetingName}
			userId={data.user.id}
			userName={data.user.name}
			userImage={
				data.user.image ??
				generateAvatarUri({ seed: data.user.name, variant: "initials" })
			}
		/>
	);
}
