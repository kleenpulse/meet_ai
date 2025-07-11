import EmptyState from "@/components/empty-state";

export default function CancelledState() {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
			<EmptyState
				title="Meeting cancelled"
				description="This meeting was cancelled."
				image="/cancelled.svg"
			/>
		</div>
	);
}
