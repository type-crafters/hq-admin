import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        let url: URL;
        if (category) {
            url = new URL(`/api/hq/settings?category=${category}`, API_URL);
        } else {
            url = new URL("/api/hq/settings", API_URL);
        }

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
                { error: "Failed to fetch settings" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { category, settings } = body;

        const url = new URL("/api/hq/settings", API_URL);
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ category, settings })
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data);
        } else {
            return NextResponse.json(
                { error: "Failed to update settings" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
