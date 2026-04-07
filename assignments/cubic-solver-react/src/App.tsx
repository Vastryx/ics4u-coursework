import { useState } from 'react';

import { CubicEquation } from './components/CubicEquation';
import { CubicGraph } from './components/CubicGraph';
import { CubicHistory } from './components/CubicHistory';
import { CubicInput } from './components/CubicInput';
import { CubicTable } from './components/CubicTable';
import { type CoefficientsType } from './types';

export function App() {
	const [coefficients, setCoefficients] = useState<CoefficientsType>({
		a: 1,
		b: 6,
		c: 11,
		d: 8,
	});
	const [history, setHistory] = useState<CoefficientsType[]>([]);

	function cardano(p: number, q: number, a: number, b: number) {
		const part = -q / 2;
		const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
		// Account for floating point errors
		// Clamp to 0 to avoid negative square root
		const part2 = Math.sqrt(Math.max(discriminant, 0));
		return Math.cbrt(part + part2) + Math.cbrt(part - part2) - b / (3 * a);
	}

	function trig(p: number, q: number, a: number, b: number) {
		const angle = Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3)))) / 3;
		const part = 2 * Math.sqrt(-p / 3);
		const part2 = b / (3 * a);

		const x1 = part * Math.cos(angle) - part2;
		const x2 = part * Math.cos(angle + 2 * (Math.PI / 3)) - part2;
		const x3 = part * Math.cos(angle + 4 * (Math.PI / 3)) - part2;

		return [x1, x2, x3];
	}

	const roots: (number | null)[] = [];
	let p = 0;
	let q = 0;
	let discriminant = 0;

	const { a, b, c, d } = coefficients;

	p = (3 * a * c - b ** 2) / (3 * a ** 2);
	q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
	discriminant = (q / 2) ** 2 + (p / 3) ** 3;

	// Account for floating point errors
	// Scale tolerance to term with largest magnitude
	const discriminantTolerance =
		Number.EPSILON * Math.max(1, Math.abs((q / 2) ** 2), Math.abs((p / 3) ** 3)) * 1024;

	if (discriminant < -discriminantTolerance) {
		// 3 real
		const [x1, x2, x3] = trig(p, q, a, b);
		roots.push(x1, x2, x3);
	} else if (discriminant > discriminantTolerance) {
		// 1 real, 2 complex
		const realRoot = cardano(p, q, a, b);
		roots.push(realRoot, null, null);
	} else if (Math.abs(p) < discriminantTolerance && Math.abs(q) < discriminantTolerance) {
		// 1 real (Triple)
		const tripleRoot = cardano(p, q, a, b);
		roots.push(tripleRoot, tripleRoot, tripleRoot);
	} else {
		// 3 real (Double and single root)
		const repeatedRoot = cardano(p, q, a, b);
		const singleRoot = Math.cbrt(q / 2) - b / (3 * a);
		roots.push(singleRoot, repeatedRoot, repeatedRoot);
	}

	function saveCurrentResult() {
		if (a === 0) {
			return;
		}

		setHistory((previous) => {
			const nextEntry: CoefficientsType = { ...coefficients };
			return [nextEntry, ...previous].slice(0, 8);
		});
	}

	return (
		<div className="mx-auto max-w-6xl p-4 font-sans md:p-8">
			<div className="rounded-xl border border-gray-300 p-4 md:p-6">
				<CubicInput
					coefficients={coefficients}
					setCoefficients={setCoefficients}
					onSave={saveCurrentResult}
				/>
			</div>
			<div className="mt-4 rounded-xl border border-gray-300 p-4 md:p-6">
				<CubicEquation coefficients={coefficients} />
				<div className="flex flex-col flex-wrap items-start gap-12 md:flex-row">
					<div className="flex w-full flex-col gap-4 md:w-auto">
						<CubicTable p={p} q={q} discriminant={discriminant} roots={roots} />
						<CubicHistory history={history} setCoefficients={setCoefficients} />
					</div>
					<CubicGraph a={a} b={b} c={c} d={d} roots={roots} />
				</div>
			</div>
		</div>
	);
}
