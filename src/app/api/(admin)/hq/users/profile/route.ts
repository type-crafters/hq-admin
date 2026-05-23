import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET(request: NextRequest) {
    try {
        const url = new URL("/api/hq/users/profile", API_URL);
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
            return NextResponse.json({ message: "Failed to fetch profile." }, { status: response.status });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const url = new URL("/api/hq/users/profile", API_URL);
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ message: "Failed to update profile." }, { status: response.status });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
