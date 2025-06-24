import { auth } from "@/lib/auth";
import SignInView from "@/modules/auth/ui/views/sign-in-view";

import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Sign In - Vibe AI",
	description: "Login your account to continue",
};

export default async function SignInPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!!session) redirect("/");

	return <SignInView />;
}
