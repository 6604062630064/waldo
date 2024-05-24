"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Transition({
	children,
	RunAnimationOnRender = true,
	key,
}: {
	children: React.ReactNode;
	RunAnimationOnRender?: boolean;
	key: string;
}) {
	return (
		<AnimatePresence mode="wait" initial={RunAnimationOnRender}>
			<motion.div
				key="test"
				className="flex w-full justify-between"
				initial={{ x: 30, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ ease: "easeInOut", duration: 0.5 }}
				exit={{ x: -80, opacity: 0 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
