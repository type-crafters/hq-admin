"use client";

import type { BlogPost } from "@/common/interface/BlogPost";
import { useState, useTransition, type JSX, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { OutputData } from "@editorjs/editorjs";
import Editor from "@/components/Editor";
import { createPostAction, updatePostAction } from "./actions";

interface BlogPostFormProps {
	mode: "create" | "edit";
	post?: BlogPost;
}

const DEFAULT_EDITOR_DATA: OutputData = {
	time: Date.now(),
	blocks: [],
	version: "2.31.6",
};

function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");
}

export default function BlogPostForm({ mode, post }: BlogPostFormProps): JSX.Element {
	const router = useRouter();
	const [title, setTitle] = useState(post?.title ?? "");
	const [slug, setSlug] = useState(post?.slug ?? "");
	const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
	const [content, setContent] = useState<OutputData>(post?.content ?? DEFAULT_EDITOR_DATA);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleTitleBlur = useCallback(() => {
		if (title && !slug) {
			setSlug(generateSlug(title));
		}
	}, [title, slug]);

	const handleEditorChange = useCallback((data: OutputData) => {
		setContent(data);
		setSuccess(false);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError("Title is required");
			return;
		}

		const formData = new FormData();
		formData.append("title", title.trim());
		formData.append("slug", slug.trim() || generateSlug(title));
		formData.append("content", JSON.stringify(content));
		formData.append("status", status);
		// TODO: Get actual author ID from auth context
		formData.append("authorId", "system");

		startTransition(async () => {
			let result;

			if (mode === "edit" && post) {
				result = await updatePostAction(post.id, formData);
			} else {
				result = await createPostAction(formData);
			}

			if (result.success) {
				setSuccess(true);
				setTimeout(() => {
					router.push("/hq/blog");
				}, 1500);
			} else {
				setError(result.error || `Failed to ${mode} post`);
			}
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-6"
		>
			<div className="space-y-4">
				{/* Title */}
				<div>
					<label className="block text-xs uppercase font-bold opacity-60 mb-2">
						Title *
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							setError(null);
						}}
						onBlur={handleTitleBlur}
						placeholder="Enter post title"
						className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
						disabled={isPending}
					/>
				</div>

				{/* Slug */}
				<div>
					<label className="block text-xs uppercase font-bold opacity-60 mb-2">
						Slug
					</label>
					<div className="flex items-center">
						<span className="px-4 py-3 bg-zinc-900 border border-r-0 border-zinc-700 rounded-l-lg text-zinc-500">
							/hq/blog/
						</span>
						<input
							type="text"
							value={slug}
							onChange={(e) => {
								setSlug(e.target.value);
								setError(null);
							}}
							placeholder="auto-generated-from-title"
							className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-r-lg focus:outline-none focus:border-indigo-500 transition-colors"
							disabled={isPending}
						/>
					</div>
					<p className="text-xs opacity-40 mt-1">
						Leave empty to auto-generate from title
					</p>
				</div>

				{/* Status */}
				<div>
					<label className="block text-xs uppercase font-bold opacity-60 mb-2">
						Status
					</label>
					<select
						value={status}
						onChange={(e) => {
							setStatus(e.target.value as "draft" | "published");
							setSuccess(false);
						}}
						className="custom-select px-4 py-3 w-48"
						disabled={isPending}
					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>
			</div>

			{/* Editor */}
			<div className="border-t border-zinc-700 pt-6">
				<label className="block text-xs uppercase font-bold opacity-60 mb-2">
					Content
				</label>
				<div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
					<Editor
						data={content}
						onChange={handleEditorChange}
						placeholder="Start writing your post..."
					/>
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
					<div className="flex items-center gap-2">
						<i className="bi bi-exclamation-circle"></i>
						<span>{error}</span>
					</div>
				</div>
			)}

			{/* Success Message */}
			{success && (
				<div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
					<div className="flex items-center gap-2">
						<i className="bi bi-check-circle"></i>
						<span>
							Post {mode === "create" ? "created" : "updated"} successfully! Redirecting...
						</span>
					</div>
				</div>
			)}

			{/* Actions */}
			<div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-700">
				<a
					href="/hq/blog"
					className="px-4 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-700 duration-150"
				>
					Cancel
				</a>
				<button
					type="submit"
					disabled={isPending}
					className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed duration-150"
				>
					{isPending ? (
						<>
							<i className="bi bi-arrow-repeat animate-spin"></i>
							<span>{mode === "create" ? "Creating..." : "Saving..."}</span>
						</>
					) : (
						<>
							<i className="bi bi-check-lg"></i>
							<span>{mode === "create" ? "Create Post" : "Save Changes"}</span>
						</>
					)}
				</button>
			</div>
		</form>
	);
}
