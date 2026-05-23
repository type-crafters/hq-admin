import type { JSX } from "react";
import { Suspense } from "react";
import { getPaginatedPostsAction } from "./actions";
import DeletePostForm from "./DeletePostForm";

interface BlogPostsListProps {
	page?: number;
}

const POSTS_PER_PAGE = 10;

async function BlogPostsList({ page = 1 }: BlogPostsListProps): Promise<JSX.Element> {
	const result = await getPaginatedPostsAction(page, POSTS_PER_PAGE);

	if (!result.success || !result.data || result.data.posts.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="text-6xl mb-4 opacity-20">
					<i className="bi bi-journal-text"></i>
				</div>
				<h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
				<p className="opacity-60 mb-6">
					Create your first post to get started with your blog
				</p>
				<a
					href="/hq/blog/new"
					className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 duration-150"
				>
					<i className="bi bi-plus-lg"></i>
					<span>Create First Post</span>
				</a>
			</div>
		);
	}

	const { posts, total, totalPages, currentPage, hasNextPage, hasPrevPage } = result.data;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-full max-w-sm rounded border border-zinc-500 bg-zinc-900/50 flex items-center gap-2 px-3 py-1 outline outline-transparent has-focus:outline-indigo-500 duration-150">
						<i className="bi bi-search text-zinc-500"></i>
						<input
							type="text"
							placeholder="Search posts..."
							className="flex-1 focus:outline-none placeholder:text-zinc-500"
						/>
					</div>
					<select className="custom-select px-3 py-2 text-sm">
						<option value="all">All Status</option>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>
				<a
					href="/hq/blog/new"
					className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 duration-150"
				>
					<i className="bi bi-plus-lg"></i>
					<span>Create Post</span>
				</a>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full rounded-lg border border-neutral-500 border-separate border-spacing-0">
					<thead>
						<tr>
							<th className="text-center font-bold border-b border-neutral-500 p-2">
								<div className="inline-flex items-center gap-1">
									<span>Title</span>
									<button aria-label="Sort by title" className="rounded-full hover:bg-zinc-700 duration-150">
										<i className="bi bi-arrow-down-up text-[10px] p-1"></i>
									</button>
								</div>
							</th>
							<th className="text-center font-bold border-b border-neutral-500 p-2">
								<div className="inline-flex items-center gap-1">
									<span>Status</span>
									<button aria-label="Sort by status" className="rounded-full hover:bg-zinc-700 duration-150">
										<i className="bi bi-arrow-down-up text-[10px] p-1"></i>
									</button>
								</div>
							</th>
							<th className="text-center font-bold border-b border-neutral-500 p-2">
								<div className="inline-flex items-center gap-1">
									<span>Created</span>
									<button aria-label="Sort by created" className="rounded-full hover:bg-zinc-700 duration-150">
										<i className="bi bi-arrow-down-up text-[10px] p-1"></i>
									</button>
								</div>
							</th>
							<th className="text-center font-bold border-b border-neutral-500 p-2">
								<div className="inline-flex items-center gap-1">
									<span>Actions</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => (
							<tr key={post.id} className="group">
								<td className="p-2 group-not-last:border-b border-zinc-500 text-center">
									<div>
										<div className="font-medium">{post.title}</div>
										<div className="text-sm opacity-60">/{post.slug}</div>
									</div>
								</td>
								<td className="p-2 group-not-last:border-b border-zinc-500 text-center">
									<span
										className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
											post.status === "published"
												? "bg-green-500/10 text-green-400 border border-green-500/30"
												: "bg-amber-500/10 text-amber-400 border border-amber-500/30"
										}`}
									>
										<i
											className={`bi ${
												post.status === "published" ? "bi-globe" : "bi-pencil-square"
											}`}
										></i>
										{post.status === "published" ? "Published" : "Draft"}
									</span>
								</td>
								<td className="p-2 group-not-last:border-b border-zinc-500 text-center">
									{new Date(post.createdAt).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</td>
								<td className="p-2 group-not-last:border-b border-zinc-500">
									<div className="flex items-center justify-center gap-2">
										<a
											href={`/hq/blog/${post.id}`}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-zinc-600 rounded-lg hover:bg-zinc-700 duration-150"
											title="Edit post"
										>
											<i className="bi bi-pencil"></i>
											<span>Edit</span>
										</a>
										<DeletePostForm postId={post.id} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between pt-4">
					<div className="text-sm opacity-60">
						Showing {posts.length} of {total} posts
					</div>
					<div className="flex items-center gap-2">
						<a
							href={`/hq/blog?page=${currentPage - 1}`}
							className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-zinc-600 rounded-lg transition-colors ${
								hasPrevPage
									? "hover:bg-zinc-700 duration-150"
									: "opacity-50 cursor-not-allowed pointer-events-none"
							}`}
						>
							<i className="bi bi-chevron-left"></i>
							<span>Previous</span>
						</a>
						<div className="flex items-center gap-1">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
								<a
									key={pageNum}
									href={`/hq/blog?page=${pageNum}`}
									className={`inline-flex items-center justify-center w-9 h-9 text-sm rounded-lg transition-colors ${
										pageNum === currentPage
											? "bg-indigo-600 text-white"
											: "border border-zinc-600 hover:bg-zinc-700 duration-150"
									}`}
								>
									{pageNum}
								</a>
							))}
						</div>
						<a
							href={`/hq/blog?page=${currentPage + 1}`}
							className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-zinc-600 rounded-lg transition-colors ${
								hasNextPage
									? "hover:bg-zinc-700 duration-150"
									: "opacity-50 cursor-not-allowed pointer-events-none"
							}`}
						>
							<span>Next</span>
							<i className="bi bi-chevron-right"></i>
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

function PostsListSkeleton(): JSX.Element {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="h-10 w-64 bg-zinc-800 rounded-lg animate-pulse"></div>
				<div className="h-10 w-32 bg-zinc-800 rounded-lg animate-pulse"></div>
			</div>
			<div className="rounded-lg border border-neutral-500 overflow-hidden">
				<div className="h-10 border-b border-neutral-500"></div>
				{[1, 2, 3].map((i) => (
					<div key={i} className="h-14 border-b border-zinc-500 animate-pulse"></div>
				))}
			</div>
		</div>
	);
}

interface BlogPostListViewProps {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPostListView({ searchParams }: BlogPostListViewProps): Promise<JSX.Element> {
	const params = searchParams ? await searchParams : undefined;
	const page = params?.page ? parseInt(String(params.page), 10) : 1;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Blog Posts</h1>
				<p className="text-sm opacity-60 mt-1">
					Manage your blog content
				</p>
			</div>

			<Suspense fallback={<PostsListSkeleton />} key={page}>
				<BlogPostsList page={page} />
			</Suspense>
		</div>
	);
}
