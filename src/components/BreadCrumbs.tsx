"use client";
import { IBreadCrumb } from "@common/interface";
import { JSX, useContext } from "react";
import { BreadCrumbContext } from "./BreadCrumbContext";

export default function BreadCrumbs(): JSX.Element {
    const { crumbs }: { crumbs: IBreadCrumb[] } = useContext(BreadCrumbContext)!;
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap list-none">
                {crumbs.map((crumb, i) => (
                    <li
                        key={i}
                        className="flex items-center not-last:after:content-['\203A'] not-last:after:text-2xl not-last:after:mb-1 not-last:after:mx-3 not-last:after:opacity-60"
                    >
                        <a
                            href={crumb.href}
                            aria-current={i === crumbs.length - 1 ? "page" : undefined}
                            className="text-blue-500 hover:underline"
                            onClick={i === crumbs.length - 1 ? (e) => e.preventDefault() : undefined}
                            title={i === crumbs.length - 1 ? "You are here" : undefined}
                        >{crumb.title}</a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
