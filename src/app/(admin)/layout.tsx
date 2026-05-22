import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { JSX, ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({
    children
}: AdminLayoutProps): JSX.Element {
    return (
        <div className="flex w-full h-screen overflow-y-hidden">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-full overflow-y-hidden">
                <AdminHeader />
                <main className="flex-1 p-4 overflow-y-auto">
                    <div className="w-full h-full max-w-6xl space-y-4 mx-auto">
                        <Breadcrumbs />
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}