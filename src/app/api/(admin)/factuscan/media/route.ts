import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET() {
    try {
        const url = new URL("/api/factuscan/media", API_URL);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ message: "Failed to fetch media." }, { status: response.status });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
