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
                <main id="viewport-container" className="w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto flex flex-col flex-1 p-4 gap-4">
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