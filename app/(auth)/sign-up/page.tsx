import { auth } from "@/lib/auth";
import SignUpView from "@/modules/auth/ui/views/sign-up-view";

import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Sign Up - Vibe AI",
	description: "Create your account to continue",
};

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!!session) redirect("/");
	return <SignUpView />;
}
