export const dynamic = "force-dynamic";

type scoreObjectType = {
	id: number;
	name: string;
	time_spent: number;
	timestamp: Date;
};

const getLeaderboard: () => Promise<null | scoreObjectType[]> = async () => {
	const response = await fetch(`${process.env.HOST}/leaderboard`, {
		method: "GET",
		mode: "cors",
		cache: "no-store",
		headers: {
			Origin: process.env.FRONTEND_URL,
		},
	});

	console.log(response.ok);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return null;
	}
};
export default async function LeaderBoard() {
	const response: null | scoreObjectType[] = await getLeaderboard();

	return (
		<div className="flex justify-center pt-7">
			<div className="w-full max-w-screen-lg px-[min(1.5rem,2vw-5px)]">
				<table className="box-border w-full border-collapse overflow-hidden rounded-2xl">
					<thead className="h-16 bg-[#6d7ae0] text-white">
						<tr>
							<th className="pl-8 text-left font-normal tracking-wide">Name</th>
							<th className="text-left font-normal tracking-wide">Time</th>
						</tr>
					</thead>
					<tbody>
						{response?.map((e, index) => (
							<tr className="h-12 hover:bg-[#ecedff]" key={index}>
								<td className="pl-8">{e.name}</td>
								<td>{e.time_spent / 1000}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
