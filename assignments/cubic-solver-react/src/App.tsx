import { useState } from 'react';

import { CubicEquation } from './components/CubicEquation';
import { CubicGraph } from './components/CubicGraph';
import { CubicInput } from './components/CubicInput';
import { CubicTable } from './components/CubicTable';
import type { CoefficientsType } from './types';

export function App() {
	const [coefficients, setcoefficients] = useState<CoefficientsType>();

	function handleSubmit(name: string, value: number) {}

	return (
		<div className="m-auto max-w-4/5 p-8">
			<div className="rounded-2xl border border-gray-300 p-6">
				<CubicInput handler={handleSubmit} />
			</div>
			<div className="mt-4 rounded-2xl border border-gray-300 p-6">
				<CubicEquation />
				<div>
					<CubicTable />
					<CubicGraph />
				</div>
			</div>
		</div>
	);
}
