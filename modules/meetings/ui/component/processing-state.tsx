import EmptyState from "@/components/empty-state";

export default function ProcessingState() {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
			<EmptyState
				title="Meeting completed"
				description="This meeting was completed. processing the summary."
				image="/processing.svg"
			/>
		</div>
	);
}
