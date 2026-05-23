import { OutputData } from "@editorjs/editorjs";

export type PostStatus = "draft" | "published";

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	content: OutputData;
	status: PostStatus;
	createdAt: Date;
	updatedAt: Date;
	authorId: string;
}

export interface CreatePostInput {
	title: string;
	slug: string;
	content: OutputData;
	status?: PostStatus;
	authorId: string;
}

export interface UpdatePostInput {
	title?: string;
	slug?: string;
	content?: OutputData;
	status?: PostStatus;
}

export interface ActionResult<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
}
