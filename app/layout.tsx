import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ProvidersLayout from "./providers";
import { TRPCReactProvider } from "../trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next";

const inter = Inter({
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Vibe.AI",
	description: "Vibe.AI - Your AI Companion",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NuqsAdapter>
			<TRPCReactProvider>
				<html lang="en">
					<body
						className={`${inter.className} ${geistMono.variable} antialiased`}
					>
						<Toaster />
						<ProvidersLayout>{children}</ProvidersLayout>
					</body>
				</html>
			</TRPCReactProvider>
		</NuqsAdapter>
	);
}
