import type { JSX, ReactNode } from "react";
import styles from "@styles/tooltip.module.css";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipArgs {
    tip: string;
    position: TooltipPosition;
    children: ReactNode;
}

export default function Tooltip({ 
    tip,
    position,
    children
}: TooltipArgs): JSX.Element {
    return (
        <div role="tooltip" data-tip={tip} className={`${styles.tooltip} ${styles[position]}`} tabIndex={0}>
            {children}
        </div>
    );
}