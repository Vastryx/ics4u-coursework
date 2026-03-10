import { CubicInput } from './components/CubicInput';
import { CubicEquation } from './components/CubicEquation';
import { useState } from 'react';
import type { CoefficientsType } from './types';

export function App() {
	const [coefficients, setcoefficients] = useState<CoefficientsType>();

	console.log(coefficients);

	return (
		<div className="m-auto p-8 max-w-4/5">
			<div className="p-6 border border-gray-300 rounded-2xl">
				<CubicInput set={setcoefficients} />
			</div>
			<div className="p-6 border border-gray-300 rounded-2xl mt-4">
				<CubicEquation />
			</div>
		</div>
	);
}
