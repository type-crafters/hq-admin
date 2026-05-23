"use client";

import { useEffect, useRef, type JSX } from "react";
import type EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import "@/styles/editor.css";

interface EditorProps {
	data?: OutputData;
	onChange?: (data: OutputData) => void;
	onReady?: () => void;
	placeholder?: string;
	readOnly?: boolean;
}

export default function Editor({
	data,
	onChange,
	onReady,
	placeholder = "Start writing your post...",
	readOnly = false,
}: EditorProps): JSX.Element {
	const editorRef = useRef<EditorJS | null>(null);
	const holderRef = useRef<HTMLDivElement>(null);
	const isReadyRef = useRef(false);
	const isInternalChange = useRef(false);
	const lastDataRef = useRef<string>(JSON.stringify(data ?? {}));

	useEffect(() => {
		let isMounted = true;

		const initEditor = async () => {
			const EditorJS = (await import("@editorjs/editorjs")).default;
			const Paragraph = (await import("@editorjs/paragraph")).default;
			const Header = (await import("@editorjs/header")).default;
			const List = (await import("@editorjs/list")).default;
			const Image = (await import("@editorjs/image")).default;
			const Quote = (await import("@editorjs/quote")).default;
			const Code = (await import("@editorjs/code")).default;
			const Delimiter = (await import("@editorjs/delimiter")).default;
			const Link = (await import("@editorjs/link")).default;
			const Underline = (await import("@editorjs/underline")).default;

			if (!isMounted || !holderRef.current) {
				return;
			}

			const editor = new EditorJS({
				holder: holderRef.current,
				tools: {
					paragraph: Paragraph,
					header: {
						class: Header,
						config: {
							levels: [1, 2, 3, 4, 5, 6],
							defaultLevel: 2,
						},
					},
					list: {
						class: List,
						inlineToolbar: true,
						config: {
							defaultStyle: "unordered",
						},
					},
					image: {
						class: Image,
						config: {
							endpoints: {
								byFile: "/api/upload/image",
								byUrl: "/api/upload/image",
							},
						},
					},
					quote: {
						class: Quote,
						inlineToolbar: true,
						config: {
							quotePlaceholder: "Enter a quote",
							captionPlaceholder: "Quote's author",
						},
					},
					code: Code,
					delimiter: Delimiter,
					link: {
						class: Link,
						config: {
							endpoint: "/api/fetch-url",
						},
					},
					underline: Underline,
				},
				data: data,
				placeholder: placeholder,
				readOnly: readOnly,
				autofocus: !readOnly,
				onReady: () => {
					isReadyRef.current = true;
					onReady?.();
				},
				onChange: async () => {
					if (onChange) {
						const savedData = await editor.save();
						isInternalChange.current = true;
						lastDataRef.current = JSON.stringify(savedData);
						onChange(savedData);
					}
				},
			});

			editorRef.current = editor;
		};

		initEditor();

		return () => {
			isMounted = false;
			if (editorRef.current) {
				try {
					editorRef.current.destroy();
				} catch {
					// Ignore destroy errors
				}
				editorRef.current = null;
			}
		};
	}, []);

	// Update data when it changes externally (for edit mode)
	useEffect(() => {
		if (editorRef.current && data && !readOnly && isReadyRef.current) {
			// Skip if this change came from the editor's own onChange
			if (isInternalChange.current) {
				isInternalChange.current = false;
				return;
			}

			// Only update if data is actually different from what we have
			const dataStr = JSON.stringify(data);
			if (dataStr === lastDataRef.current) {
				return;
			}

			lastDataRef.current = dataStr;
			editorRef.current.render(data).catch(() => {
				// Ignore render errors
			});
		}
	}, [data, readOnly]);

	return (
		<div
			ref={holderRef}
			className="min-h-75 prose prose-invert max-w-none"
		/>
	);
}
