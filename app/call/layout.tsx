import React from "react";

export default function CallLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="h-dvh  bg-black">{children}</div>;
}
