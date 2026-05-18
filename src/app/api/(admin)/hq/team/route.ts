import { NextResponse } from "next/server";

export async function GET() {
    try {
        const url = new URL("/api/members", process.env.API_URL);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ message: "Failed to fetch team members." }, { status: response.status });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}