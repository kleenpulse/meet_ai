import SignUpView from "@/modules/auth/ui/views/sign-up-view";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign Up - Vibe AI",
	description: "Create your account to continue",
};

export default function SignUpPage() {
	return <SignUpView />;
}
