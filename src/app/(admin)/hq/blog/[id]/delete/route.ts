import { redirect } from "next/navigation";
import { deletePost, blogStore } from "@/lib/store/blogStore";
import { revalidatePath } from "next/cache";

/**
 * Handles blog post deletion via form POST.
 * Removes the post from the in-memory store and redirects back to the posts list.
 */
export async function POST(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<never> {
	const { id } = await params;
	console.log('[delete route] Attempting to delete post with ID:', id);
	console.log('[delete route] Store size before:', blogStore.size);

	try {
		const deleted = deletePost(id);
		console.log('[delete route] deletePost result:', deleted);
		console.log('[delete route] Store size after:', blogStore.size);

		if (!deleted) {
			console.error("[delete route] Post not found:", id);
		}

		revalidatePath("/hq/blog");
	} catch (error) {
		console.error("[delete route] Error deleting post:", error);
	}

	redirect("/hq/blog");
}