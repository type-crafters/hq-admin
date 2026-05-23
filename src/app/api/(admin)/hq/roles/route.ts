import { NextResponse } from "next/server";

export async function GET() {
    try {
        const url = new URL("/api/hq/roles", process.env.API_URL);
        const response = await fetch(url, {
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            return NextResponse.json([], { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}
