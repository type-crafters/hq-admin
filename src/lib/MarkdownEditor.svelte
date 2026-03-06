<script lang="ts">
    import { tick } from "svelte";

    interface MarkdownEditorProps {
        id: string;
        name?: string;
        placeholder?: string;
    }
    let textarea: HTMLTextAreaElement | null = null;
    let viewContent: "write" | "preview" = $state("write");
    let content: string = $state("");
    let html: string = $derived(content);

    const selectLine = (event: KeyboardEvent) => {
        if (!textarea) return;

        if (event.ctrlKey && event.code === "KeyL") {
            event.preventDefault();

            let start = textarea.selectionStart;
            let end = textarea.selectionEnd;

            const lineStart = content.lastIndexOf("\n", start - 1) + 1;

            let lineEnd = content.indexOf("\n", end);
            if (lineEnd === -1) lineEnd = content.length;

            if (start === lineStart && end === lineEnd) {
                let nextEnd = content.indexOf("\n", lineEnd + 1);
                if (nextEnd === -1) nextEnd = content.length;

                textarea.selectionStart = lineStart;
                textarea.selectionEnd = nextEnd;
            } else {
                textarea.selectionStart = lineStart;
                textarea.selectionEnd = lineEnd;
            }
        }
    };

    const wrapOnce = async (before: string, after: string = "") => {
        if (!textarea) return;

        const start: number = textarea.selectionStart;
        const end: number = textarea.selectionEnd;

        const selection = content.slice(start, end);

        let firstLetter: number;
        let lastLetter: number;

        if (start === end) {
            if (
                content.slice(start - before.length, start) === before &&
                (!after || content.slice(start, start + after.length) === after)
            ) {
                content =
                    content.slice(0, start - before.length) +
                    content.slice(start + after.length);

                await tick();

                textarea.selectionStart = start - before.length;
                textarea.selectionEnd = start - before.length;
                textarea.focus();
                return;
            }
        }

        if (start === end) {
            firstLetter = content.slice(0, start).lastIndexOf(" ") + 1;
            lastLetter =
                content.slice(end).indexOf(" ") >= 0
                    ? content.slice(end).indexOf(" ") + end
                    : content.length;
        } else {
            firstLetter = selection.startsWith(" ")
                ? start + selection.length - selection.trimStart().length
                : start;
            lastLetter = selection.endsWith(" ")
                ? end + selection.trimEnd().length - selection.length
                : end;
        }

        const wordSelection = content.slice(firstLetter, lastLetter);

        if (
            content.slice(firstLetter - before.length, firstLetter) ===
                before &&
            (!after ||
                content.slice(lastLetter, lastLetter + after.length) === after)
        ) {
            content =
                content.slice(0, firstLetter - before.length) +
                wordSelection +
                content.slice(lastLetter + after.length);

            await tick();
            textarea.selectionStart = firstLetter - before.length;
            textarea.selectionEnd = lastLetter - before.length;
        } else {
            content =
                content.slice(0, firstLetter) +
                before +
                wordSelection +
                after +
                content.slice(lastLetter);
            await tick();
            textarea.selectionStart = firstLetter + before.length;
            textarea.selectionEnd = lastLetter + before.length;
        }

        textarea.focus();
    };

    const wrapEachLine = async (before: string, after: string = "") => {
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const startLineStart = content.lastIndexOf("\n", start - 1) + 1;

        let endLineEnd = content.indexOf("\n", end);
        if (endLineEnd === -1) endLineEnd = content.length;

        let workingSelection = content.slice(startLineStart, endLineEnd);
        let workingLines = workingSelection.split("\n");

        const trimmed = before.trim();
        const numericCandidate = trimmed.replace(".", "");
        let i = Number.parseInt(numericCandidate, 10);
        const isNumbered = !Number.isNaN(i);

        const lastLine = workingLines.at(-1) ?? "";

        const isWrapped = (line: string) => {
            if (isNumbered) return /^\d+\.\s/.test(line);
            return line.startsWith(before) && (!after || line.endsWith(after));
        };

        if (isWrapped(lastLine)) {
            let nextLineEnd = content.indexOf("\n", endLineEnd + 1);
            if (nextLineEnd === -1) nextLineEnd = content.length;

            workingSelection = content.slice(startLineStart, nextLineEnd);
            workingLines = workingSelection.split("\n");

            endLineEnd = nextLineEnd;
        }

        const processed = workingLines.map((line) => {
            let prefix = before;

            if (isNumbered) {
                prefix = `${i++}. `;
            }

            if (isWrapped(line)) {
                if (isNumbered) return line;
                return line.slice(
                    before.length,
                    after ? line.length - after.length : undefined,
                );
            }

            return prefix + line + after;
        });

        const result = processed.join("\n");

        content =
            content.slice(0, startLineStart) +
            result +
            content.slice(endLineEnd);

        await tick();

        textarea.selectionStart = startLineStart;
        textarea.selectionEnd = startLineStart + result.length;

        textarea.focus();
    };

    const {
        id,
        name = id,
        placeholder = "Write here...",
    }: MarkdownEditorProps = $props();
</script>

<div class="space-y-1">
    <div
        class="tabs tabs-lift w-full max-w-2xl rounded-lg has-focus:ring-2 ring-blue-500 duration-150 bg-zinc-800/50"
    >
        <input
            type="radio"
            name="view-content"
            class="tab rounded-t-lg [--tab-bg:var(--color-zinc-800)] [--tab-border-color:var(--color-zinc-600)]"
            aria-label="Write"
            value="write"
            bind:group={viewContent}
        />
        <div
            class="tab-content p-4 bg-zinc-800 border-zinc-600 rounded-b-lg rounded-t-none"
        >
            <textarea
                {name}
                {id}
                class="w-full min-h-60 focus:outline-none resize-y"
                {placeholder}
                bind:value={content}
                bind:this={textarea}
                onkeydown={(e) => selectLine(e)}
            ></textarea>
        </div>

        <input
            type="radio"
            name="view-content"
            class="tab rounded-t-lg [--tab-bg:var(--color-zinc-800)] [--tab-border-color:var(--color-zinc-600)]"
            aria-label="Preview"
            value="preview"
            bind:group={viewContent}
        />
        <div
            class="tab-content p-4 bg-zinc-800 border-zinc-600 rounded-b-lg rounded-t-none"
        >
            {#if html}
                {html}
            {:else}
                Nothing to preview
            {/if}
        </div>
        <div
            id="toolbar"
            class="tab flex-1 justify-end [--tab-bg:var(--color-zinc-800)] [--tab-border-color:var(--color-zinc-600)] hover:text-base-content/50 cursor-auto"
        >
            <div class="flex items-center gap-2">
                <div class="tooltip tooltip-bottom" data-tip="Heading">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Heading"
                        onclick={() => wrapOnce("### ")}
                    >
                        <i class="bi bi-type-h3 text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Bold">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Bold"
                        onclick={() => wrapOnce("**", "**")}
                    >
                        <i class="bi bi-type-bold text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Italic">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Italic"
                        onclick={() => wrapOnce("*", "*")}
                    >
                        <i class="bi bi-type-italic text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Strikethrough">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Strikethrough"
                        onclick={() => wrapOnce("~", "~")}
                    >
                        <i class="bi bi-type-strikethrough text-xl"></i>
                    </button>
                </div>
                <div class="divider divider-horizontal m-1"></div>
                <div class="tooltip tooltip-bottom" data-tip="Quote">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Quote"
                        onclick={() => wrapEachLine("> ")}
                    >
                        <i class="bi bi-quote text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Code">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Code"
                        onclick={() => wrapOnce("```\n", "\n```")}
                    >
                        <i class="bi bi-code-slash text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Hyperlink">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Hyperlink"
                        onclick={() => wrapOnce("[", "](url)")}
                    >
                        <i class="bi bi-link-45deg text-xl"></i>
                    </button>
                </div>
                <div class="divider divider-horizontal m-1"></div>
                <div class="tooltip tooltip-bottom" data-tip="Unordered list">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Unordered list"
                        onclick={() => wrapEachLine("* ")}
                    >
                        <i class="bi bi-list-ul text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Ordered list">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Ordered list"
                        onclick={() => wrapEachLine("1. ")}
                    >
                        <i class="bi bi-list-ol text-xl"></i>
                    </button>
                </div>
                <div class="tooltip tooltip-bottom" data-tip="Checklist">
                    <button
                        class="p-1 rounded hover:bg-zinc-700/50 duration-150"
                        aria-label="Checklist"
                        onclick={() => wrapEachLine("- [ ] ")}
                    >
                        <i class="bi bi-list-check text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <label for="files">
        <div
            role="presentation"
            class="opacity-70 text-sm flex px-2 py-1 gap-1 hover:bg-zinc-700/50 duration-150 rounded w-max cursor-pointer"
        >
            <i class="bi bi-paperclip rotate-45"></i>
            <span>Click to attach a file</span>
        </div>
        <input type="file" id="files" class="hidden" />
    </label>
</div>