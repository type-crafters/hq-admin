"use client";
import { useContext, useEffect } from "react";
import { BreadCrumbContext } from "./BreadCrumbContext";

export default function SetBreadCrumb({
    title,
    href
}: SetBreadCrumbProps): null {
    const { register, unregister } = useContext(BreadCrumbContext)!;

    useEffect(() => {
        register({ title, href });
        return () => unregister(href);
    }, [title, href, register, unregister]);

    return null;
}

interface SetBreadCrumbProps {
    title: string;
    href: string;
}