import type { CoefficientsType } from '../types';

export function CubicEquation({ coefficients }: { coefficients: CoefficientsType }) {
	const terms: [number, string][] = [
		[coefficients.a, 'x³'],
		[coefficients.b, 'x²'],
		[coefficients.c, 'x'],
		[coefficients.d, ''],
	];

	if (coefficients.a === 0) {
		return;
	}

	const term = (coeff: number, value: string) =>
		`${coeff > 0 ? '+ ' : '- '}${value && Math.abs(coeff) === 1 ? value : Math.abs(coeff) + value}`;
	const equation = terms
		.filter(([coeff]) => coeff !== 0)
		.map(([coeff, value], i) =>
			i === 0 ? term(coeff, value).replace('+ ', '') : term(coeff, value),
		)
		.join(' ');

	return <p className="font-math mb-4 text-3xl">{`${equation} = 0`}</p>;
}
