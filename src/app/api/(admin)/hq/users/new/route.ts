import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const form = await request.formData();

        const firstName = form.get("firstName");
        const lastName = form.get("lastName");
        const email = form.get("email");
        const role = form.get("role");
        const rawPermissions = form.get("permissions");
        const permissions = rawPermissions ? (JSON.parse(rawPermissions as string) as string[]) : [];
        const showOnPage = form.get("showOnPage");


        const data = {
            firstName,
            lastName,
            email,
            role,
            permissions,
            showOnPage: !!showOnPage
        };

        const url = new URL("/api/users", process.env.API_URL);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to invite user" },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result, { status: response.status });

    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}