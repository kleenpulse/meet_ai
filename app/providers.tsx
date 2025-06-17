"use client";

import { ProgressProvider } from "@bprogress/next/app";

export default function ProvidersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProgressProvider
			height="3px"
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
		</ProgressProvider>
	);
}
