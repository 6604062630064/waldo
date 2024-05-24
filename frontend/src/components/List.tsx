export default function List({
	name,
	checkFoundCharacter,
}: {
	name: string;
	checkFoundCharacter: (name: string) => void;
}) {
	return (
		<li
			className="cursor-pointer hover:border-1 hover:border-white"
			onClick={() => checkFoundCharacter(name)}
		>
			{name}
		</li>
	);
}
