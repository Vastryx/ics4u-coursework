type CubicTableProps = {
	p: number;
	q: number;
	discriminant: number;
	roots: (number | null)[];
};

export function CubicTable({ p, q, discriminant, roots }: CubicTableProps) {
	const formatRoot = (root: number | null) => {
		if (root === null) {
			return 'Complex Root';
		}
		if (!isFinite(root)) {
			return '';
		}
		return root;
	};
	const formatNumber = (number: number) => (isFinite(number) ? number : '');

	const statRows = [
		{ label: 'p', value: formatNumber(p) },
		{ label: 'q', value: formatNumber(q) },
		{ label: 'Discriminant', value: formatNumber(discriminant) },
	];

	return (
		<div className="w-full md:w-auto md:min-w-72">
			<h2 className="mb-2 text-xl font-semibold">Result</h2>
			<table className="w-full border-collapse md:w-auto md:min-w-72">
				<tbody>
					{statRows.map((row) => (
						<tr key={row.label}>
							<th
								className="border border-gray-300 px-3.5 py-3 text-left font-semibold"
								scope="row"
							>
								{row.label}
							</th>
							<td className="border border-gray-300 px-3.5 py-3 text-left">{row.value}</td>
						</tr>
					))}
					<tr>
						<th className="border border-gray-300 px-3.5 py-3 text-left" scope="row">
							Value
						</th>
						<td className="border border-gray-300 px-3.5 py-3 text-left">x</td>
						<td className="border border-gray-300 px-3.5 py-3 text-left">y</td>
					</tr>
					{['Root 1', 'Root 2', 'Root 3'].map((label, index) => (
						<tr key={label}>
							<th
								className="border border-gray-300 px-3.5 py-3 text-left font-semibold"
								scope="row"
							>
								{label}
							</th>
							<td className="border border-gray-300 px-3.5 py-3 text-left">
								{formatRoot(roots[index])}
							</td>
							<td className="border border-gray-300 px-3.5 py-3 text-left">0</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
