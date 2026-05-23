import { BlogPost, CreatePostInput, UpdatePostInput } from "@/common/interface/BlogPost";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const DATA_FILE = join(DATA_DIR, "blog-posts.json");

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
	mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Loads posts from disk.
 */
function loadPosts(): Map<string, BlogPost> {
	try {
		if (existsSync(DATA_FILE)) {
			const data = readFileSync(DATA_FILE, "utf-8");
			const posts: BlogPost[] = JSON.parse(data);
			// Parse dates back from strings
			const parsedPosts = posts.map(p => ({
				...p,
				createdAt: new Date(p.createdAt),
				updatedAt: new Date(p.updatedAt),
			}));
			console.log('[blogStore] Loaded', parsedPosts.length, 'posts from disk');
			return new Map(parsedPosts.map(p => [p.id, p]));
		}
	} catch (e) {
		console.error('[blogStore] Error loading posts:', e);
	}
	return new Map();
}

/**
 * Saves posts to disk.
 */
function savePosts(posts: Map<string, BlogPost>): void {
	try {
		const postsArray = Array.from(posts.values());
		writeFileSync(DATA_FILE, JSON.stringify(postsArray, null, 2), "utf-8");
		console.log('[blogStore] Saved', postsArray.length, 'posts to disk');
	} catch (e) {
		console.error('[blogStore] Error saving posts:', e);
	}
}

/**
 * File-based store for blog posts.
 * Persists to disk for development/testing.
 */
export const blogStore = loadPosts();

/**
 * Generates a URL-friendly slug from a title.
 * Converts to lowercase, removes special characters, and replaces spaces with hyphens.
 *
 * @param {string} title - The title to convert to a slug
 * @returns {string} A URL-friendly slug
 * @example
 * generateSlug("Hello World!") // returns "hello-world"
 * generateSlug("My Blog Post") // returns "my-blog-post"
 */
function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");
}

/**
 * Creates a new blog post and stores it in the blogStore.
 * Generates a unique ID using crypto.randomUUID() and timestamps automatically.
 * If no slug is provided, one will be auto-generated from the title.
 *
 * @param {CreatePostInput} input - The post creation data
 * @param {string} input.title - The post title (required)
 * @param {string} [input.slug] - The URL slug (optional, auto-generated if omitted)
 * @param {import("@editorjs/editorjs").OutputData} input.content - The Editor.js content data
 * @param {"draft" | "published"} [input.status] - Post status (defaults to "draft")
 * @param {string} input.authorId - ID of the post author (required)
 * @returns {BlogPost} The created blog post with generated ID and timestamps
 * @throws {Error} If crypto.randomUUID() fails
 */
export function createPost(input: CreatePostInput): BlogPost {
	const now = new Date();
	const post: BlogPost = {
		id: crypto.randomUUID(),
		title: input.title,
		slug: input.slug || generateSlug(input.title),
		content: input.content,
		status: input.status || "draft",
		createdAt: now,
		updatedAt: now,
		authorId: input.authorId,
	};

	blogStore.set(post.id, post);
	savePosts(blogStore);
	console.log('[blogStore] Created post:', post.id, 'Title:', post.title, 'Store size:', blogStore.size);
	return post;
}

/**
 * Retrieves a blog post by its unique ID.
 *
 * @param {string} id - The unique identifier of the post
 * @returns {BlogPost | undefined} The blog post if found, undefined otherwise
 * @example
 * const post = getPostById("550e8400-e29b-41d4-a716-446655440000");
 * if (post) {
 *   console.log(post.title);
 * }
 */
export function getPostById(id: string): BlogPost | undefined {
	return blogStore.get(id);
}

/**
 * Retrieves all blog posts sorted by creation date (newest first).
 * Converts the Map values to an array and sorts by createdAt timestamp.
 *
 * @returns {BlogPost[]} Array of all blog posts, sorted by createdAt descending
 * @example
 * const posts = getAllPosts();
 * posts.forEach(post => console.log(post.title));
 */
export function getAllPosts(): BlogPost[] {
	return Array.from(blogStore.values()).sort(
		(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
	);
}

/**
 * Pagination result interface for paginated post queries.
 */
export interface PaginatedPostsResult {
	posts: BlogPost[];
	total: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

/**
 * Retrieves paginated blog posts sorted by creation date (newest first).
 *
 * @param {number} page - The page number (1-based)
 * @param {number} limit - Number of posts per page
 * @returns {PaginatedPostsResult} Paginated result with posts and metadata
 * @example
 * const result = getPaginatedPosts(1, 10);
 * console.log(`Page ${result.currentPage} of ${result.totalPages}`);
 * console.log(`Showing ${result.posts.length} of ${result.total} posts`);
 */
export function getPaginatedPosts(page: number, limit: number): PaginatedPostsResult {
	console.log('[blogStore] getPaginatedPosts called, store size:', blogStore.size);
	const allPosts = getAllPosts();
	const total = allPosts.length;
	const totalPages = Math.ceil(total / limit);
	const currentPage = Math.max(1, Math.min(page, totalPages || 1));
	const startIndex = (currentPage - 1) * limit;
	const endIndex = startIndex + limit;
	const posts = allPosts.slice(startIndex, endIndex);

	return {
		posts,
		total,
		totalPages,
		currentPage,
		hasNextPage: currentPage < totalPages,
		hasPrevPage: currentPage > 1,
	};
}

/**
 * Updates an existing blog post with partial data.
 * Only provided fields will be updated; undefined fields are ignored.
 * Automatically updates the updatedAt timestamp.
 *
 * @param {string} id - The unique identifier of the post to update
 * @param {UpdatePostInput} input - Partial post data to update
 * @param {string} [input.title] - New title (optional)
 * @param {string} [input.slug] - New slug (optional)
 * @param {import("@editorjs/editorjs").OutputData} [input.content] - New content (optional)
 * @param {"draft" | "published"} [input.status] - New status (optional)
 * @returns {BlogPost | undefined} The updated blog post, or undefined if not found
 * @example
 * const updated = updatePost("post-id", { title: "New Title", status: "published" });
 * if (updated) {
 *   console.log("Updated at:", updated.updatedAt);
 * }
 */
export function updatePost(id: string, input: UpdatePostInput): BlogPost | undefined {
	const existingPost = blogStore.get(id);
	if (!existingPost) {
		return undefined;
	}

	const updatedPost: BlogPost = {
		...existingPost,
		...(input.title !== undefined && { title: input.title }),
		...(input.slug !== undefined && { slug: input.slug }),
		...(input.content !== undefined && { content: input.content }),
		...(input.status !== undefined && { status: input.status }),
		updatedAt: new Date(),
	};

	blogStore.set(id, updatedPost);
	savePosts(blogStore);
	return updatedPost;
}

/**
 * Deletes a blog post by its unique ID.
 *
 * @param {string} id - The unique identifier of the post to delete
 * @returns {boolean} True if the post was found and deleted, false otherwise
 * @example
 * const deleted = deletePost("post-id");
 * if (deleted) {
 *   console.log("Post deleted successfully");
 * }
 */
export function deletePost(id: string): boolean {
	const deleted = blogStore.delete(id);
	if (deleted) {
		savePosts(blogStore);
	}
	return deleted;
}
