export function CubicTable({
	p,
	q,
	discriminant,
	roots,
}: {
	p: number;
	q: number;
	discriminant: number;
	roots: number[];
}) {
	return (
		<table className="min-w-2xs border-collapse">
			<tbody>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						p
					</th>
					<td className="border border-gray-400 px-3 text-left">{p.toLocaleString()}</td>
				</tr>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						q
					</th>
					<td className="border border-gray-400 px-3 text-left">{q.toLocaleString()}</td>
				</tr>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						Discriminant
					</th>
					<td className="border border-gray-400 px-3 text-left">{discriminant.toLocaleString()}</td>
				</tr>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						Value
					</th>
					<td className="border border-gray-400 px-3 text-left">x</td>
					<td className="border border-gray-400 px-3 text-left">y</td>
				</tr>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						Root 1
					</th>
					<td className="border border-gray-400 px-3 text-left">
						{roots[0].toLocaleString() || 'Complex Root'}
					</td>
					<td className="border border-gray-400 px-3 text-left">0</td>
				</tr>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						Root 2
					</th>
					<td className="border border-gray-400 px-3 text-left">
						{roots[1].toLocaleString() || 'Complex Root'}
					</td>
					<td className="border border-gray-400 px-3 text-left">0</td>
				</tr>
				<tr>
					<th className="border border-gray-400 px-3 text-left" scope="row">
						Root 3
					</th>
					<td className="border border-gray-400 px-3 text-left">
						{roots[2].toLocaleString() || 'Complex Root'}
					</td>
					<td className="border border-gray-400 px-3 text-left">0</td>
				</tr>
			</tbody>
		</table>
	);
}
