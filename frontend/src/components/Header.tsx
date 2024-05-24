"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { default as NextLink } from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import Transition from "@/components/Transition";
import TimeContext from "./Context";

// import Link from "next/link";
export default function Header() {
	const [startTime, setStartTime, stopTimer, setStopTimer] =
		useContext(TimeContext);
	const [ms, setMs] = useState<number>(0);
	const [second, setSecond] = useState<number>(0);

	useEffect(() => {
		console.log(stopTimer);
		if (!stopTimer) {
			const interval = setInterval(() => {
				const current = Date.now();
				const total = current - startTime;

				setSecond(Math.floor(total / 1000));
				setMs(total % 1000);
			}, 5);
			return () => {
				clearInterval(interval);
			};
		}
	}, [stopTimer]);

	const path = usePathname();
	if (path === "/game") {
		return (
			<Navbar
				isBordered={true}
				className={`h-12 bg-white transition-[height] duration-[750]`}
			>
				<Transition key="game">
					<NavbarContent justify="center">
						<NavbarItem>
							<Link href="/" as={NextLink}>
								<MdArrowBackIosNew className="fill-black" />
								Go back
							</Link>
						</NavbarItem>
					</NavbarContent>
					<NavbarItem>
						<h3 className="font-mono">
							Timer {second.toString().padStart(3, "0")} :{" "}
							{ms.toString().padStart(3, "0")}
						</h3>
					</NavbarItem>
				</Transition>
			</Navbar>
		);
	} else {
		return (
			<Navbar isBordered={true} className={`h-20 bg-white transition-height`}>
				<NavbarContent>
					<NavbarItem>
						<Link href="/" as={NextLink}>
							Play
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link href="leaderboard" as={NextLink}>
							Leaderboard
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarBrand className="justify-end">
					<h1 className="text-xl">Waldo</h1>
				</NavbarBrand>
			</Navbar>
		);
	}
}
