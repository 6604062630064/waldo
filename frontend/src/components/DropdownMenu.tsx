"use client";

import { AnimatePresence, motion } from "framer-motion";
import List from "@/components/List";

export default function DropdownMenu({
	cordinates,
	isMenuOpen,
	checkFoundCharacter,
	foundCharacters,
}: {
	cordinates: { x: number; y: number };
	isMenuOpen: boolean;
	checkFoundCharacter: (name: string) => void;
	foundCharacters: { wally: boolean };
}) {
	return (
		<AnimatePresence mode="wait">
			{isMenuOpen && (
				<motion.div
					className={
						"absolute z-40 justify-between bg-[#18181b] p-2 text-white"
					}
					style={{
						left: cordinates.x,
						top: cordinates.y,
						originX: "0%",
						originY: "0%",
					}}
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ ease: "easeInOut", duration: 0.1 }}
					exit={{ scale: 0.5, opacity: 0 }}
				>
					<ul className={`flex flex-col`}>
						{Object.entries(foundCharacters).map((e, i) => {
							if (e[1] === false) {
								return (
									<List
										key={i}
										checkFoundCharacter={checkFoundCharacter}
										name={e[0]}
									></List>
								);
							}
						})}
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
