"use client";
import { IBreadCrumb } from "@common/interface";
import { Nullable } from "@common/types";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import path from "path";
import { createContext, JSX, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface IBreadcrumbContext {
    crumbs: IBreadCrumb[];
    register: (crumb: IBreadCrumb) => void;
    unregister: (href: string) => void;
}

export const BreadCrumbContext = createContext<Nullable<IBreadcrumbContext>>(null);

export function BreadCrumbProvider({
    children
}: BreadCrumbProviderProps): JSX.Element {
    const [crumbs, setCrumbs] = useState<IBreadCrumb[]>([]);

    const register = useCallback((crumb: IBreadCrumb) => {
        setCrumbs((current) => {
            if (current.some(c => c.href === crumb.href)) return current;

            const parent = current.at(-1);
            const fullHref = parent ? path.posix.join(parent.href, crumb.href) : crumb.href;

            return [...current, { title: crumb.title, href: fullHref }];
        });
    }, []);

    const unregister = useCallback((href: string) => {
        setCrumbs((current) => current.filter((c) => c.href !== href));
    }, []);

    return (
        <BreadCrumbContext.Provider value={{ crumbs, register, unregister }}>
            {children}
        </BreadCrumbContext.Provider>
    )
}

interface BreadCrumbProviderProps {
    children: ReactNode;
}