import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { CallSessionStartedEvent } from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignature(body: string, signature: string) {
	return streamVideo.verifyWebhook(body, signature);
}

export async function POST(request: NextRequest) {
	const apiKey = request.headers.get("x-api-key") as string;
	const signature = request.headers.get("x-signature") as string;

	if (!signature || !apiKey) {
		return NextResponse.json(
			{ error: "Missing signature or API Key" },
			{ status: 400 }
		);
	}

	const body = await request.text();

	if (!verifySignature(body, signature)) {
		return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
	}

	let payload: unknown;
	try {
		payload = JSON.parse(body) as Record<string, unknown>;
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const eventType = (payload as Record<string, unknown>)?.type;

	if (eventType === "call.session_started") {
		const event = payload as CallSessionStartedEvent;
		const meetingId = event.call.custom?.meetingId;

		if (!meetingId) {
			return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
		}

		const [existingMeeting] = await db
			.select()
			.from(meetings)
			.where(
				and(
					eq(meetings.id, meetingId),
					not(eq(meetings.status, "completed")),
					not(eq(meetings.status, "active")),
					not(eq(meetings.status, "processing")),
					not(eq(meetings.status, "cancelled"))
				)
			);

		if (!existingMeeting) {
			return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
		}

		await db
			.update(meetings)
			.set({
				status: "active",
				startedAt: new Date(),
			})
			.where(eq(meetings.id, existingMeeting.id));

		const [existingAgent] = await db
			.select()
			.from(agents)
			.where(eq(agents.id, existingMeeting.agentId));

		if (!existingAgent) {
			return NextResponse.json({ error: "Agent not found" }, { status: 404 });
		}

		const call = streamVideo.video.call("default", meetingId);

		await call.create({
			data: {
				created_by_id: ctx.auth.user.id,
				custom: {
					meetingId: meetingId,
					meetingName: createdMeeting.name,
				},
				settings_override: {
					transcription: {
						language: "en",
						mode: "auto-on",
						closed_caption_mode: "auto-on",
					},
					recording: {
						mode: "auto-on",
						quality: "1080p",
					},
				},
			},
		});
	}

	return NextResponse.json({ status: "ok" });
}
