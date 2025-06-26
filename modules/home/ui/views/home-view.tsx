"use client";

import { useTRPC } from "@/app/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
	const trpc = useTRPC();
	const { data } = useQuery(trpc.hello.queryOptions({ text: "world" }));

	return (
		<div className="flex flex-col gap-4 p-4">
			<p>{data?.greeting}</p>
		</div>
	);
}
