import { type CoefficientsType, fields } from '../types';

type CubicHistoryProps = {
	history: CoefficientsType[];
	setCoefficients: React.Dispatch<React.SetStateAction<CoefficientsType>>;
};

export function CubicHistory({ history, setCoefficients }: CubicHistoryProps) {
	return (
		<div className="w-full md:w-auto md:min-w-72">
			<h2 className="mb-2 text-xl font-semibold">History</h2>
			{history.length === 0 ? (
				<p className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
					Save a result to add it to history.
				</p>
			) : (
				<div className="overflow-hidden border-gray-300">
					<table className="w-full border-collapse">
						<thead>
							<tr>
								{['#', 'a', 'b', 'c', 'd'].map((key) => {
									return (
										<th
											className="border border-gray-300 px-3.5 py-3 text-left font-semibold"
											scope="col"
											key={key}
										>
											{key}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{history.map((entry, index) => (
								<tr
									key={index}
									onClick={() => setCoefficients(entry)}
									className="cursor-pointer hover:bg-gray-100"
								>
									<td className="border border-gray-300 px-3.5 py-3 text-left">
										{history.length - index}
									</td>

									{fields.map((key) => (
										<td key={key} className="border border-gray-300 px-3.5 py-3 text-left">
											{entry[key]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
