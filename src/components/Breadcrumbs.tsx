"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import type { JSX } from "react";

export default function Breadcrumbs(): JSX.Element {
    const segments = useSelectedLayoutSegments();

    const formatSegment = (segment: string) => {
        const keywords: Record<string, string> = {
            "hq": "HQ",
            "factuscan": "FactuScan"
        };

        if (segment in keywords) {
            return keywords[segment];
        }

        return segment
            .split("-")
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
    }

    return (
        <ul className="flex items-center">
            {segments.map((segment, i) => {
                const href = "/" + segments.slice(0, i + 1).join("/");

                return (
                    <li
                        key={i}
                        className="flex items-center not-last:after:content-['/'] after:opacity-60 after:text-xs after:px-2"
                    >
                        <Link
                            href={href}
                            className="rounded-full px-1 opacity-60 hover:bg-neutral-700 hover:opacity-100"
                        >
                            {formatSegment(segment)}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}