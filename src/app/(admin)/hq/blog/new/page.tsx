import type { JSX } from "react";
import type { Metadata } from "next";
import BlogPostForm from "../BlogPostForm";

export const metadata: Metadata = {
	title: "Create New Post - HQ Admin",
	description: "Create a new blog post",
};

export default function NewPostPage(): JSX.Element {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<a
					href="/hq/blog"
					className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 duration-150"
				>
					<i className="bi bi-arrow-left"></i>
					<span>Back to Posts</span>
				</a>
			</div>

			<div>
				<h1 className="text-2xl font-bold">Create New Post</h1>
				<p className="text-sm opacity-60 mt-1">
					Write a new blog post with rich content
				</p>
			</div>

			<BlogPostForm mode="create" />
		</div>
	);
}