"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
	const { data: session } = authClient.useSession();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleCreateUser = async () => {
		authClient.signUp.email(
			{
				email,
				name,
				password,
			},
			{
				onError: (error) => {
					console.log("ERROR:", error);
				},
				onSuccess: () => {
					alert("User created successfully!");
					setEmail("");
					setName("");
					setPassword("");
				},
			}
		);
	};

	if (session) {
		return (
			<div className="flex flex-col items-center justify-center h-screen gap-4 px-10">
				<p>You are signed in</p>
				<p>Email: {session.user.email}</p>
				<p>Name: {session.user.name}</p>
				<Button onClick={() => authClient.signOut()}>Sign Out</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4 px-10">
			<Input
				placeholder="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				placeholder="password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<Button onClick={handleCreateUser}>Create User</Button>
		</div>
	);
}
