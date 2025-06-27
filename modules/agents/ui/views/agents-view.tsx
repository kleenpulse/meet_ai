"use client";
import ResponsiveDialog from "@/components/responsive-dialog";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function AgentsView() {
	const trpc = useTRPC();
	// const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

	return <div>{/* {JSON.stringify(data, null, 2)} */}</div>;
}
