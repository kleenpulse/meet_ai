import { useTRPC } from "@/trpc/client";

import { useRouter } from "@bprogress/next/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingGetOne } from "../../types";
import { meetingsInsertSchema } from "../../schemas";
import { useState } from "react";
import CommandSelect from "@/components/command-select";
import GeneratedAvatar from "@/components/generated-avatar";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
	onSuccess?: (id?: string) => void;
	onCancel?: () => void;
	initialValues?: MeetingGetOne;
}
export default function MeetingForm({
	onSuccess,
	onCancel,
	initialValues,
}: MeetingFormProps) {
	const initialValue = Array.isArray(initialValues)
		? initialValues[0]
		: initialValues;

	const trpc = useTRPC();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [agentSearch, setAgentSearch] = useState("");
	const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

	const agents = useQuery(
		trpc.agents.getMany.queryOptions({
			pageSize: 100,
			search: agentSearch,
		})
	);

	const updateMeeting = useMutation(
		trpc.meetings.update.mutationOptions({
			onSuccess: async (data) => {
				await queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				);

				if (initialValue?.id) {
					await queryClient.invalidateQueries(
						trpc.meetings.getOne.queryOptions({ id: initialValue.id })
					);
				}

				onSuccess?.(data?.id);
			},
			onError: (error) => {
				toast.error(error.message);
				console.log(error);
			},
		})
	);
	const createMeeting = useMutation(
		trpc.meetings.create.mutationOptions({
			onSuccess: async (data) => {
				await queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				);

				onSuccess?.(data?.id);
			},
			onError: (error) => {
				toast.error(error.message);
				console.log(error);
			},
		})
	);

	const form = useForm<z.infer<typeof meetingsInsertSchema>>({
		resolver: zodResolver(meetingsInsertSchema),
		defaultValues: {
			name: initialValue?.name || "",
			agentId: initialValue?.agentId || "",
		},
	});
	const isEdit = !!initialValue?.id;
	const isPending = createMeeting.isPending || updateMeeting.isPending;

	const onSubmit = async (data: z.infer<typeof meetingsInsertSchema>) => {
		if (isEdit) {
			updateMeeting.mutate({ ...data, id: initialValue?.id });
		} else {
			createMeeting.mutate(data);
		}
	};
	return (
		<>
			<NewAgentDialog
				open={openNewAgentDialog}
				onOpenChange={setOpenNewAgentDialog}
			/>

			<Form {...form}>
				<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="e.g Meeting 1" />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="agentId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Agent</FormLabel>
								<FormControl>
									<CommandSelect
										options={(agents.data?.items || []).map((agent) => {
											return {
												value: agent.id,
												id: agent.id,
												children: (
													<div className="flex items-center gap-x-2">
														<GeneratedAvatar
															seed={agent.name}
															variant="botttsNeutral"
															className="border size-6"
														/>
														<span>{agent.name}</span>
													</div>
												),
											};
										})}
										onSelect={field.onChange}
										onSearch={setAgentSearch}
										value={field.value}
										placeholder="Select an Agent"
									/>
								</FormControl>
								<FormDescription>
									Not found what you&apos;re looking for?{" "}
									<button
										type="button"
										className="text-primary hover:underline"
										onClick={() => setOpenNewAgentDialog(true)}
									>
										Create new agent
									</button>
								</FormDescription>
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
		</>
	);
}
