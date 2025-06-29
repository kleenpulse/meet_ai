import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useRouter } from "@bprogress/next/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import GeneratedAvatar from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialValues?: AgentGetOne;
}
export default function AgentForm({
	onSuccess,
	onCancel,
	initialValues,
}: AgentFormProps) {
	const initialValue = Array.isArray(initialValues)
		? initialValues[0]
		: initialValues;

	const trpc = useTRPC();
	const router = useRouter();
	const queryClient = useQueryClient();

	const createAgent = useMutation(
		trpc.agents.create.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					trpc.agents.getMany.queryOptions({})
				);

				if (initialValue?.id) {
					await queryClient.invalidateQueries(
						trpc.agents.getOne.queryOptions({ id: initialValue.id })
					);
				}

				onSuccess?.();
			},
			onError: (error) => {
				toast.error(error.message);
				console.log(error);
			},
		})
	);

	const form = useForm<z.infer<typeof agentsInsertSchema>>({
		resolver: zodResolver(agentsInsertSchema),
		defaultValues: {
			name: initialValue?.name || "",

			instructions: initialValue?.instructions ?? "",
		},
	});
	const isEdit = !!initialValue?.id;
	const isPending = createAgent.isPending;

	const onSubmit = async (data: z.infer<typeof agentsInsertSchema>) => {
		if (isEdit) {
			await createAgent.mutateAsync({
				...data,
				id: initialValue.id,
			});
		} else {
			createAgent.mutate(data);
		}
	};
	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<GeneratedAvatar
					seed={form.watch("name")}
					variant="botttsNeutral"
					className="border size-16"
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="e.g John Doe" />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="instructions"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instructions</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="You are a helpful assistant"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between gap-x-2">
					{onCancel && (
						<Button
							type="button"
							onClick={() => onCancel()}
							disabled={isPending}
							variant={"outline"}
						>
							Cancel
						</Button>
					)}
					<Button type="submit" disabled={isPending}>
						{isEdit ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
