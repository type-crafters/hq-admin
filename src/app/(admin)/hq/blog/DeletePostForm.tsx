"use client";

import { type JSX, useState } from "react";
import { useRouter } from "next/navigation";

interface DeletePostFormProps {
	postId: string;
}

export default function DeletePostForm({ postId }: DeletePostFormProps): JSX.Element {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!confirm("Are you sure you want to delete this post?")) {
			return;
		}

		setIsDeleting(true);
		console.log('[DeletePostForm] Deleting post:', postId);

		try {
			const response = await fetch(`/api/hq/blog/${postId}`, {
				method: 'DELETE',
			});
			
			console.log('[DeletePostForm] Response status:', response.status);
			
			if (response.ok) {
				console.log('[DeletePostForm] Delete successful, refreshing...');
				router.refresh();
			} else {
				console.error('[DeletePostForm] Delete failed:', await response.text());
				alert('Failed to delete post');
			}
		} catch (error) {
			console.error('[DeletePostForm] Error:', error);
			alert('Error deleting post');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<form
			className="inline"
			onSubmit={handleSubmit}
		>
			<button
				type="submit"
				disabled={isDeleting}
				className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
				title="Delete post"
			>
				{isDeleting ? (
					<>
						<i className="bi bi-arrow-repeat animate-spin"></i>
						<span>Deleting...</span>
					</>
				) : (
					<>
						<i className="bi bi-trash"></i>
						<span>Delete</span>
					</>
				)}
			</button>
		</form>
	);
}