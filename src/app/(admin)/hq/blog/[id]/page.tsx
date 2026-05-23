import { notFound } from "next/navigation";
import type { JSX } from "react";
import type { Metadata } from "next";
import { getPostAction } from "../actions";
import BlogPostForm from "../BlogPostForm";

interface PageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const result = await getPostAction(id);

	if (!result.success || !result.data) {
		return {
			title: "Post Not Found - HQ Admin",
		};
	}

	return {
		title: `Edit ${result.data.title} - HQ Admin`,
		description: `Edit blog post: ${result.data.title}`,
	};
}

export default async function EditPostPage({ params }: PageProps): Promise<JSX.Element> {
	const { id } = await params;
	const result = await getPostAction(id);

	if (!result.success || !result.data) {
		notFound();
	}

	const post = result.data;

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
				<h1 className="text-2xl font-bold">Edit Post</h1>
				<p className="text-sm opacity-60 mt-1">
					Update your blog post content
				</p>
			</div>

			<BlogPostForm mode="edit" post={post} />
		</div>
	);
}