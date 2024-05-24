import { default as NextLink } from "next/link";
import { Image } from "@nextui-org/image";
import { Button, Link } from "@nextui-org/react";
import Wally from "@/assets/wally.png";

export default function Home() {
	// const onPress = (e: PressEvent): void => {
	// 	console.log(e);
	// };

	return (
		<main className="px-3">
			<div className="m-auto mt-52 flex max-w-screen-sm flex-col items-center gap-3 border-2 border-black p-2 ">
				<h3 className="text-lg">
					You need to find the location of these characters
				</h3>
				<Image
					src={Wally.src}
					alt="wally"
					width={170}
					isZoomed
					className=""
				></Image>
				<Button color="primary">
					<Link href="/game" className="text-white" as={NextLink}>
						Start
					</Link>
				</Button>
			</div>
		</main>
	);
}
