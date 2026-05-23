import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("profilePicture") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Only JPG and PNG files are allowed" },
                { status: 400 }
            );
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size must be less than 2MB" },
                { status: 400 }
            );
        }

        // Convert file to base64 (for demo purposes - in production, upload to S3/Cloudinary)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const url = `data:${file.type};base64,${base64}`;

        // In production, you would:
        // 1. Upload to S3, Cloudinary, or similar
        // 2. Get the URL back
        // 3. Update user profile in database
        // For now, we return the base64 URL directly

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        return NextResponse.json(
            { error: "Failed to upload photo" },
            { status: 500 }
        );
    }
}
