import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
	meetingId: string;
	onCancelMeeting: () => void;
	isCancelling: boolean;
}
export default function UpcomingState({
	meetingId,
	onCancelMeeting,
	isCancelling,
}: Props) {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
			<EmptyState
				title="Not started yet"
				description="Once the meeting has started, a summary will appear here."
				image="/upcoming.svg"
			/>

			<div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
				<Button
					disabled={isCancelling}
					onClick={onCancelMeeting}
					variant={"secondary"}
					className="w-full lg:w-auto"
				>
					<BanIcon />
					Cancel Meeting
				</Button>
				<Button disabled={isCancelling} asChild className="w-full lg:w-auto">
					<Link href={`/call/${meetingId}`}>
						<VideoIcon />
						Start Meeting
					</Link>
				</Button>
			</div>
		</div>
	);
}
