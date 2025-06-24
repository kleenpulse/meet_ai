"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "@bprogress/next/app";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email(),
		password: z.string().min(1, "Password is required"),
		confirmPassword: z.string().min(1, "Password confirmation is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export default function SignUpView() {
	const router = useRouter();

	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setError(null);
		setIsPending(true);

		await authClient.signUp.email(
			{
				name: data.name,
				email: data.email,
				password: data.password,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					setIsPending(false);
					router.push("/");
				},
				onError: ({ error }) => {
					setIsPending(false);
					setError(error.message || "An error occurred while signing in.");
				},
			}
		);
	};

	const handleSocialSignIn = async (provider: "github" | "google") => {
		setError(null);
		setIsPending(true);
		await authClient.signIn.social(
			{ provider },
			{
				onError: ({ error }) => {
					setIsPending(false);
					setError(
						error.message ||
							`An error occurred while signing in with ${provider.toUpperCase()}.`
					);
				},
			}
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Let&apos;s get started</h1>
									<p className="text-muted-foreground text-balance">
										Create your account to continue
									</p>
								</div>

								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														type="name"
														placeholder="John Doe"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="me@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="*********"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="*********"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{!!error && (
									<Alert className="bg-destructive/10 border-none !text-destructive">
										<OctagonAlertIcon className="size-4 " />
										<AlertTitle className="font-semibold">{error}</AlertTitle>
									</Alert>
								)}

								<Button
									disabled={isPending}
									type="submit"
									className="w-full disabled:animate-pulse"
								>
									Sign In
								</Button>
								<div className="after:border-border relative after:absolute text-center text-sm after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
									<span className="bg-card text-muted-foreground relative z-10 px-2">
										Or continue with
									</span>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<Button
										disabled={isPending}
										onClick={() => handleSocialSignIn("google")}
										variant="outline"
										className="w-full"
										type="button"
									>
										<FaGoogle />
										Google
									</Button>
									<Button
										disabled={isPending}
										onClick={() => handleSocialSignIn("github")}
										variant="outline"
										className="w-full"
										type="button"
									>
										<FaGithub />
										Github
									</Button>
								</div>
								<div className="text-center text-sm">
									Already have an account?{" "}
									<Link href="/sign-in" className="hover:underline font-bold">
										Sign In
									</Link>
								</div>
							</div>
						</form>
					</Form>

					<div className="bg-radial from-green-700 to-green-900 relative hidden md:flex  items-center justify-center  overflow-hidden">
						<div className="absolute inset-0  size-full bg-whitex bg-[linear-gradient(to_right,#012b22_1px,transparent_1px),linear-gradient(to_bottom,#01221b_1px,transparent_1px)] bg-[size:7px_7px] opacity-20" />
						<div className="flex flex-col gap-y-4 items-center justify-center z-10">
							<img src="/logo.svg" alt="logo" className="size-[92px] invert" />
							<p className="text-2xl font-semibold text-white">Vibe.AI</p>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our{" "}
				<Link href="#" className="font-semibold">
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link href="#" className="font-semibold">
					Privacy Policy
				</Link>
				.
			</div>
		</div>
	);
}
