import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET() {
    try {
        const url = new URL("/api/hq/security/roles", API_URL);
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
            return NextResponse.json(
                { error: "Failed to fetch roles" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error fetching roles: ", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, permissions } = body;

        const url = new URL("/api/hq/security/roles", API_URL);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, description, permissions })
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data, { status: 201 });
        } else {
            return NextResponse.json(
                { error: "Failed to create role" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error creating role:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
