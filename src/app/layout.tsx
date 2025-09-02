import { JSX, ReactNode } from "react";
import "@styles/index.css";
import { BreadCrumbProvider } from "@components/BreadCrumbContext";

export default function IndexLayout({
    children
}: IndexLayoutProps): JSX.Element {
    return (
        <html lang="en">
            <BreadCrumbProvider>
                <body>
                    {children}
                </body>
            </BreadCrumbProvider>
        </html>
    );
}

interface IndexLayoutProps {
    children: ReactNode;
}