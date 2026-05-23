"use server";

import { revalidatePath } from "next/cache";
import { BlogPost, CreatePostInput, UpdatePostInput, ActionResult } from "@/common/interface/BlogPost";
import {
	createPost,
	getPostById,
	getAllPosts,
	getPaginatedPosts,
	updatePost,
	deletePost,
	blogStore,
} from "@/lib/store/blogStore";
import type { PaginatedPostsResult } from "@/lib/store/blogStore";
import { OutputData } from "@editorjs/editorjs";

/**
 * Validates and extracts post data from a FormData object.
 * Checks for required fields (title, content, authorId) and parses JSON content.
 *
 * @param {FormData} formData - The form data containing post fields
 * @returns {object | null} Validated post data object, or null if validation fails
 * @returns {string} returns.title - The trimmed post title
 * @returns {string} [returns.slug] - Optional trimmed slug
 * @returns {OutputData} returns.content - Parsed Editor.js output data
 * @returns {"draft" | "published"} [returns.status] - Optional post status
 * @returns {string} returns.authorId - The author identifier
 * @example
 * const validated = validatePostData(formData);
 * if (!validated) {
 *   // Handle validation error
 * }
 */
function validatePostData(formData: FormData): { title: string; slug?: string; content: OutputData; status?: "draft" | "published"; authorId: string } | null {
	const title = formData.get("title") as string;
	const slug = formData.get("slug") as string | undefined;
	const contentString = formData.get("content") as string;
	const status = formData.get("status") as "draft" | "published" | undefined;
	const authorId = formData.get("authorId") as string;

	// Validate required fields
	if (!title || title.trim().length === 0) {
		return null;
	}

	if (!contentString) {
		return null;
	}

	if (!authorId) {
		return null;
	}

	try {
		const content = JSON.parse(contentString) as OutputData;
		return {
			title: title.trim(),
			...(slug && { slug: slug.trim() }),
			content,
			...(status && { status }),
			authorId,
		};
	} catch {
		return null;
	}
}

/**
 * Server action to create a new blog post.
 * Validates input data, creates the post in the store, and revalidates the posts list page.
 *
 * @param {FormData} formData - The form data containing post fields (title, slug, content, status, authorId)
 * @returns {Promise<ActionResult<BlogPost>>} Result object with success flag and either data or error message
 * @throws {never} All errors are caught and returned as ActionResult
 * @example
 * const formData = new FormData();
 * formData.append("title", "My Post");
 * formData.append("content", JSON.stringify(editorData));
 * formData.append("authorId", "user-123");
 * const result = await createPostAction(formData);
 * if (result.success) {
 *   console.log("Created post:", result.data.id);
 * }
 */
export async function createPostAction(formData: FormData): Promise<ActionResult<BlogPost>> {
	const validated = validatePostData(formData);

	if (!validated) {
		return {
			success: false,
			error: "Invalid post data. Title, content, and author are required.",
		};
	}

	try {
		const input: CreatePostInput = {
			title: validated.title,
			slug: validated.slug || validated.title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
			content: validated.content,
			status: validated.status || "draft",
			authorId: validated.authorId,
		};

		const post = createPost(input);
		console.log('[actions] Post created:', post.id, 'Store now has:', blogStore.size, 'posts');
		revalidatePath("/hq/blog");

		return {
			success: true,
			data: post,
		};
	} catch (error) {
		console.error("Error creating post:", error);
		return {
			success: false,
			error: "Failed to create post",
		};
	}
}

/**
 * Server action to update an existing blog post.
 * Validates input data, updates the post in the store, and revalidates the posts list page.
 *
 * @param {string} id - The unique identifier of the post to update
 * @param {FormData} formData - The form data containing updated post fields
 * @returns {Promise<ActionResult<BlogPost>>} Result object with success flag and either updated post data or error message
 * @example
 * const formData = new FormData();
 * formData.append("title", "Updated Title");
 * formData.append("content", JSON.stringify(editorData));
 * const result = await updatePostAction("post-id", formData);
 * if (result.success) {
 *   console.log("Updated post:", result.data.title);
 * }
 */
export async function updatePostAction(id: string, formData: FormData): Promise<ActionResult<BlogPost>> {
	if (!id) {
		return {
			success: false,
			error: "Post ID is required",
		};
	}

	const validated = validatePostData(formData);

	if (!validated) {
		return {
			success: false,
			error: "Invalid post data. Title, content, and author are required.",
		};
	}

	try {
		const input: UpdatePostInput = {
			title: validated.title,
			...(validated.slug && { slug: validated.slug }),
			content: validated.content,
			...(validated.status && { status: validated.status }),
		};

		const post = updatePost(id, input);

		if (!post) {
			return {
				success: false,
				error: "Post not found",
			};
		}

		revalidatePath("/hq/blog");

		return {
			success: true,
			data: post,
		};
	} catch (error) {
		console.error("Error updating post:", error);
		return {
			success: false,
			error: "Failed to update post",
		};
	}
}

/**
 * Server action to delete a blog post by ID.
 * Removes the post from the store and revalidates the posts list page.
 *
 * @param {string} id - The unique identifier of the post to delete
 * @returns {Promise<ActionResult<boolean>>} Result object with success flag
 * @example
 * const result = await deletePostAction("post-id");
 * if (result.success) {
 *   console.log("Post deleted");
 * }
 */
export async function deletePostAction(id: string): Promise<ActionResult<boolean>> {
	if (!id) {
		return {
			success: false,
			error: "Post ID is required",
		};
	}

	try {
		const deleted = deletePost(id);

		if (!deleted) {
			return {
				success: false,
				error: "Post not found",
			};
		}

		revalidatePath("/hq/blog");

		return {
			success: true,
			data: true,
		};
	} catch (error) {
		console.error("Error deleting post:", error);
		return {
			success: false,
			error: "Failed to delete post",
		};
	}
}

/**
 * Server action to retrieve a single blog post by ID.
 * Used primarily for the edit page to load existing post data.
 *
 * @param {string} id - The unique identifier of the post to retrieve
 * @returns {Promise<ActionResult<BlogPost>>} Result object with success flag and either post data or error message
 * @example
 * const result = await getPostAction("post-id");
 * if (result.success) {
 *   console.log("Post title:", result.data.title);
 * }
 */
export async function getPostAction(id: string): Promise<ActionResult<BlogPost>> {
	if (!id) {
		return {
			success: false,
			error: "Post ID is required",
		};
	}

	try {
		const post = getPostById(id);

		if (!post) {
			return {
				success: false,
				error: "Post not found",
			};
		}

		return {
			success: true,
			data: post,
		};
	} catch (error) {
		console.error("Error fetching post:", error);
		return {
			success: false,
			error: "Failed to fetch post",
		};
	}
}

/**
 * Server action to retrieve all blog posts.
 * Returns posts sorted by creation date (newest first).
 * Used for the posts list page.
 *
 * @returns {Promise<ActionResult<BlogPost[]>>} Result object with success flag and array of posts
 * @example
 * const result = await getPostsAction();
 * if (result.success) {
 *   console.log(`Found ${result.data.length} posts`);
 * }
 */
export async function getPostsAction(): Promise<ActionResult<BlogPost[]>> {
	try {
		const posts = getAllPosts();

		return {
			success: true,
			data: posts,
		};
	} catch (error) {
		console.error("Error fetching posts:", error);
		return {
			success: false,
			error: "Failed to fetch posts",
		};
	}
}

/**
 * Server action to retrieve paginated blog posts.
 * Returns posts sorted by creation date (newest first) with pagination metadata.
 *
 * @param {number} page - The page number (1-based, defaults to 1)
 * @param {number} limit - Number of posts per page (defaults to 10)
 * @returns {Promise<ActionResult<PaginatedPostsResult>>} Result object with paginated posts and metadata
 * @example
 * const result = await getPaginatedPostsAction(1, 10);
 * if (result.success) {
 *   console.log(`Page ${result.data.currentPage} of ${result.data.totalPages}`);
 *   console.log(`Posts: ${result.data.posts.length}`);
 * }
 */
export async function getPaginatedPostsAction(
	page: number = 1,
	limit: number = 10
): Promise<ActionResult<PaginatedPostsResult>> {
	try {
		const result = getPaginatedPosts(page, limit);

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		console.error("Error fetching paginated posts:", error);
		return {
			success: false,
			error: "Failed to fetch posts",
		};
	}
}
