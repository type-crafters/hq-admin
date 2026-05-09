import type { JSX } from "react";

type TextPosition = "start" | "center" | "end";
type RuleDirection = "horizontal" | "vertical";

interface RuleProps {
    text?: string;
    position: TextPosition;
    direction: RuleDirection;
    className?: string;
}

export default function Rule({
    text,
    position,
    direction
}: RuleProps): JSX.Element {

    return (
        <div className={
            `flex 
            ${direction === "horizontal" ? "flex-row" : "flex-col"}
            ${position !== "end" ? `after:[content:''] after:flex-1 after:${direction === "horizontal" ? "border-b" : "border-r"}` : ""}
            ${position !== "start" ? `before:[content:''] before:flex-1 before:${direction === "horizontal" ? "border-b" : "border-r"}` : ""} 
            justify-center items-center border-zinc-500 text-zinc-500`
        }>
            {text && (
                <span className={direction === "horizontal" ? "px-2" : "py-2"}>{text}</span>
            )}
        </div>
    );
}