"use client";
import { Image, useDisclosure } from "@nextui-org/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import TimeContext from "@/components/Context";
import SubmitModal from "@/components/SubmitModal";
import Waldo from "@/assets/waldo.jpg";
import DropdownMenu from "@/components/DropdownMenu";
import { useRouter } from "next/navigation";

type CordinatesType = [
	{ x: number; y: number },
	React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
];

const charactersCordinates: { [key: string]: { x: number; y: number } } = {
	wally: { x: 85.3645, y: 74.1988 },
};

type FoundCharactersObject = { wally: boolean };
type FoundCharactersType = [
	FoundCharactersObject,
	React.Dispatch<React.SetStateAction<FoundCharactersObject>>,
];

export default function GamePage() {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [startTime, setStartTime, stopTimer, setStopTimer] =
		useContext(TimeContext);
	const [endTime, setEndTime] = useState(0);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [cordinates, setCordinates]: CordinatesType = useState({ x: 0, y: 0 });
	const [imageCordinates, setImageCordinates] = useState({ x: 0, y: 0 });
	const [foundCharacters, setFoundCharacters]: FoundCharactersType =
		useState<FoundCharactersObject>({
			wally: false,
		});

	useEffect(() => {
		if (Object.values(foundCharacters).every((element) => element === true)) {
			if (setStopTimer) {
				setStopTimer(true);
			}

			onOpen();
		}
		return () => {
			if (setStopTimer) setStopTimer(true);
		};
	}, [endTime]);

	useEffect(() => {
		if (Object.values(foundCharacters).every((element) => element === true)) {
			setEndTime(Date.now());
		}
	}, [foundCharacters]);

	const onSubmit: (e: FormEvent) => void = async (e) => {
		e.preventDefault();
		const headers = new Headers();
		headers.set("Origin", process.env.FRONTEND_URL as string);
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		formData.append("time_spent", (endTime - startTime).toString());

		const urlSearchParams = new URLSearchParams();
		for (const [key, value] of formData.entries()) {
			urlSearchParams.append(key, value as string);
		}

		const response = await fetch(`${process.env.HOST}/leaderboard`, {
			credentials: "include",
			method: "POST",
			mode: "cors",
			body: urlSearchParams,
			headers: headers,
		});

		if (response.ok) {
			router.push("/leaderboard");
			router.refresh();
		}
	};
	const onLoad: () => void = () => {
		if (setStartTime) {
			setStartTime(Date.now());
			if (setStopTimer) setStopTimer(false);
		}
	};

	const checkFoundCharacter = (name: string) => {
		if (!foundCharacters[name as keyof FoundCharactersObject]) {
			const sourceX = charactersCordinates[name].x;
			const sourceY = charactersCordinates[name].y;
			if (
				Math.abs(imageCordinates.x - sourceX) <= 3 &&
				Math.abs(imageCordinates.y - sourceY) <= 3
			) {
				const _foundCharacters = { ...foundCharacters };
				_foundCharacters[name as keyof FoundCharactersObject] =
					!_foundCharacters[name as keyof FoundCharactersObject];

				setFoundCharacters(_foundCharacters);
			}
		}
		setIsMenuOpen((prev) => !prev);
	};

	const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
		const bodyHeight = document.querySelector("body")?.offsetHeight;
		const imageWidth = e.currentTarget.offsetWidth;
		const imageHeight = e.currentTarget.offsetHeight;
		const headerHeight = (bodyHeight ? bodyHeight : 0) - imageHeight;

		const posX = (e.pageX / imageWidth) * 100;
		const posY = ((e.pageY - headerHeight) / imageHeight) * 100;

		setImageCordinates({ x: posX, y: posY });
		setCordinates({
			x: e.pageX,
			y: e.pageY,
		});
		setIsMenuOpen((prev) => !prev);
	};
	return (
		<>
			<Image
				fetchPriority="high"
				src={Waldo.src}
				onLoad={onLoad}
				onClick={onClick}
			></Image>

			<DropdownMenu
				foundCharacters={foundCharacters}
				cordinates={cordinates}
				isMenuOpen={isMenuOpen}
				checkFoundCharacter={checkFoundCharacter}
			></DropdownMenu>
			{foundCharacters.wally && (
				<svg
					className="absolute z-40 size-[100px]"
					style={{ left: cordinates.x - 50, top: cordinates.y - 50 }}
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						r="25"
						cx="50"
						cy="50"
						stroke-width="3"
						stroke="red"
						fill="none"
					/>
				</svg>
			)}
			<SubmitModal
				isOpen={isOpen}
				onClose={onClose}
				totalTime={endTime - startTime}
				onSubmit={onSubmit}
			></SubmitModal>
		</>
	);
}
