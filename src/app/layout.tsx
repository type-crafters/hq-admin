import { JSX, ReactNode } from "react";
import "@styles/index.css";
import AppSidebar from "@components/AppSidebar";
import AppHeader from "@components/AppHeader";
import BreadCrumbs from "@components/BreadCrumbs";
import { BreadCrumbProvider } from "@components/BreadCrumbContext";
import SetBreadCrumb from "@/components/SetBreadCrumb";

export default function IndexLayout({
    children
}: IndexLayoutProps): JSX.Element {
    return (
        <html lang="en">
            <BreadCrumbProvider>
                <body className="w-screen h-screen flex overflow-hidden">
                    {children}
                </body>
            </BreadCrumbProvider>
        </html>
    );
}

interface IndexLayoutProps {
    children: ReactNode;
}