import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import BreadCrumbs from "@/components/BreadCrumbs";
import SetBreadCrumb from "@/components/SetBreadCrumb";
import { JSX, ReactNode } from "react";

export default function layout({
    children
}: PanelLayoutProps): JSX.Element {
    return (
        <>
            <AppSidebar />
            <div className="h-full flex flex-col flex-1">
                <AppHeader />
                <main id="viewport-container" className="viewport-container flex flex-col flex-1 py-4 gap-4">
                    <SetBreadCrumb title="Home" href="/" />
                    <BreadCrumbs />
                    <section id="viewport" className="flex-1">
                        {children}
                    </section>
                </main>
            </div>
        </>
    );
}

interface PanelLayoutProps {
    children: ReactNode;
}