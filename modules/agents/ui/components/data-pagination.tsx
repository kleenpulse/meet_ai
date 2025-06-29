import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function DataPagination({
	page,
	totalPages,
	onPageChange,
}: Props) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex-1 text-sm text-muted-foreground">
				Page {page} of {totalPages || 1}
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					size="sm"
					onClick={() => onPageChange(Math.max(1, page - 1))}
					variant="outline"
					disabled={page === 1}
				>
					Previous
				</Button>
				<Button
					size="sm"
					onClick={() => onPageChange(Math.min(totalPages, page + 1))}
					variant="outline"
					disabled={page === totalPages || !totalPages}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
