import { useState } from 'react';

import { CubicEquation } from './components/CubicEquation';
import { CubicInput } from './components/CubicInput';
import type { CoefficientsType } from './types';

export function App() {
	const [coefficients, setcoefficients] = useState<CoefficientsType>();

	console.log(coefficients);

	return (
		<div className="m-auto max-w-4/5 p-8">
			<div className="rounded-2xl border border-gray-300 p-6">
				<CubicInput set={setcoefficients} />
			</div>
			<div className="mt-4 rounded-2xl border border-gray-300 p-6">
				<CubicEquation />
			</div>
		</div>
	);
}
