import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET() {
	try {
		const response = await fetch(`${API_URL}/api/hq/blog`, {
			headers: { Accept: "application/json" },
		});

		const data = response.ok ? await response.json() : { message: "Failed to fetch blog posts." };
		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error("GET /api/hq/blog error:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.text();
		const response = await fetch(`${API_URL}/api/hq/blog`, {
			method: "POST",
			headers: {
				"Content-Type": req.headers.get("content-type") || "application/json",
				Accept: "application/json",
			},
			body,
		});

		const data = response.ok ? await response.json() : { message: "Failed to create blog post." };
		revalidatePath("/hq/blog");
		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error("POST /api/hq/blog error:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}