import { Metadata } from "next";
import { JSX, ReactNode } from "react";
import { Nunito } from "next/font/google";
import "@styles/index.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

interface IndexLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: "HQ Admin",
	description: "HQ administration panel"
};

const nunito = Nunito({
	subsets: ["latin"],
	display: "swap"
});

export default function IndexLayout({
	children
}: IndexLayoutProps): JSX.Element {
	return (
		<html lang="en" className={nunito.className}>
			<body>
				{children}
			</body>
		</html>
	);
}
