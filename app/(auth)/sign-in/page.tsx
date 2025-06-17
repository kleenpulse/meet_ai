import SignInView from "@/modules/auth/ui/views/sign-in-view";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In - Vibe AI",
	description: "Login your account to continue",
};

export default function SignInPage() {
	return <SignInView />;
}
