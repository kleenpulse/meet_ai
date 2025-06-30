import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";

interface Props {
	title: string;
	description: string;
}
type PromiseStateProps = {
	resolve: (value: boolean) => void;
};
export const useConfirm = ({
	title,
	description,
}: Props): [() => JSX.Element, () => Promise<unknown>] => {
	const [promise, setPromise] = useState<PromiseStateProps | null>(null);

	const confirm = () => {
		return new Promise((resolve) => {
			setPromise({ resolve });
		});
	};
	const handleClose = () => {
		return new Promise((resolve) => {
			setPromise(null);
		});
	};
	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};
	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};

	const ConfirmationDialog = () => (
		<ResponsiveDialog
			open={promise !== null}
			onOpenChange={handleClose}
			title={title}
			description={description}
		>
			<div className="w-full pt-4 flex flex-col-reverse items-center gap-2 lg:flex-row lg:justify-end">
				<Button
					onClick={handleCancel}
					variant="outline"
					className="w-full lg:w-auto"
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirm}
					variant="destructive"
					className="w-full lg:w-auto"
				>
					Confirm
				</Button>
			</div>
		</ResponsiveDialog>
	);

	return [ConfirmationDialog, confirm];
};
