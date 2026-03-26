export function CubicTable({ p, q, roots }: { p: number; q: number; roots: number[] }) {
	return (
		<table>
			<tbody>
				<tr>
					<th scope="row">p</th>
					<td></td>
				</tr>
				<tr>
					<th scope="row">q</th>
					<td></td>
				</tr>
				<tr>
					<th scope="row">Discriminant</th>
					<td></td>
				</tr>
				<tr>
					<th scope="row">Value</th>
					<td>x</td>
					<td>y</td>
				</tr>
				<tr>
					<th scope="row">Root 1</th>
					<td></td>
					<td>0</td>
				</tr>
				<tr>
					<th scope="row">Root 2</th>
					<td></td>
					<td>0</td>
				</tr>
				<tr>
					<th scope="row">Root 3</th>
					<td></td>
					<td>0</td>
				</tr>
			</tbody>
		</table>
	);
}
