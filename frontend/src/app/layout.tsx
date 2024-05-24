"use client";

import "./globals.css";
import Header from "@/components/Header";
import TimeContext from "@/components/Context";
import Providers from "./providers";
import Loading from "./loading";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [startTime, setStartTime] = useState<number>(0);
	const [stopTimer, setStopTimer] = useState<boolean>(true);
	return (
		<html lang="en" className="light">
			<body className={inter.className}>
				{/* <MenuContext.Provider value={[isHidden, setIsHidden]}> */}
				<Providers>
					<TimeContext.Provider
						value={[startTime, setStartTime, stopTimer, setStopTimer]}
					>
						<Header></Header>
						{children}
					</TimeContext.Provider>
				</Providers>
				{/* </MenuContext.Provider> */}
			</body>
		</html>
	);
}
