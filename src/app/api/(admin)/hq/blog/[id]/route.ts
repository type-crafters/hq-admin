import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePost, getPostById, updatePost } from "@/lib/store/blogStore";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	console.log('[API GET] Fetching post:', id);
	
	try {
		const post = getPostById(id);
		console.log('[API GET] Found:', !!post);
		
		if (!post) {
			return NextResponse.json({ message: "Blog post not found." }, { status: 404 });
		}
		
		return NextResponse.json(post);
	} catch (error) {
		console.error(`[API GET] Error:`, error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	console.log('[API PUT] Updating post:', id);
	
	try {
		const body = await req.json();
		console.log('[API PUT] Body:', body);
		
		const post = updatePost(id, body);
		console.log('[API PUT] Updated:', !!post);
		
		if (!post) {
			return NextResponse.json({ message: "Post not found." }, { status: 404 });
		}
		
		revalidatePath("/hq/blog");
		return NextResponse.json(post);
	} catch (error) {
		console.error(`[API PUT] Error:`, error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	console.log('[API DELETE] Deleting post:', id);
	
	try {
		const deleted = deletePost(id);
		console.log('[API DELETE] Result:', deleted);

		if (!deleted) {
			return NextResponse.json({ message: "Post not found." }, { status: 404 });
		}

		revalidatePath("/hq/blog");
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(`[API DELETE] Error:`, error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
