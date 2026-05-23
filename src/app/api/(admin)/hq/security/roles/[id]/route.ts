import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

type RouteParams = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const url = new URL(`/api/hq/security/roles/${id}`, API_URL);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data);
        } else if (response.status === 404) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            );
        } else {
            return NextResponse.json(
                { error: "Failed to fetch role" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error fetching role:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, permissions } = body;

        const url = new URL(`/api/hq/security/roles/${id}`, API_URL);
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, description, permissions })
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data);
        } else if (response.status === 404) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            );
        } else {
            return NextResponse.json(
                { error: "Failed to update role" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error updating role:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const url = new URL(`/api/hq/security/roles/${id}`, API_URL);
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else if (response.status === 404) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            );
        } else {
            return NextResponse.json(
                { error: "Failed to delete role" },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error deleting role:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
