"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function HomeView() {
	return (
		<div>
			<Button onClick={() => authClient.signOut()} className="w-full">
				Sign out
			</Button>
		</div>
	);
}
