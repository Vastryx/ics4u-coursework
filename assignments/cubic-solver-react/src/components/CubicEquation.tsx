import type { CoefficientsType } from '../types';

export function CubicEquation({ coefficients }: { coefficients: CoefficientsType }) {
	if (
		coefficients.a == undefined ||
		coefficients.b == undefined ||
		coefficients.c == undefined ||
		coefficients.d == undefined
	) {
		return;
	}

	const terms: [number, string][] = [
		[coefficients.a, 'x³'],
		[coefficients.b, 'x²'],
		[coefficients.c, 'x'],
		[coefficients.d, ''],
	];
	const term = (coeff: number, value: string) =>
		`${coeff > 0 ? '+ ' : '- '}${value && Math.abs(coeff) === 1 ? value : Math.abs(coeff) + value}`;
	const equation = terms
		.filter(([coeff]) => coeff !== 0)
		.map(([coeff, value], i) =>
			i === 0 ? term(coeff, value).replace('+ ', '') : term(coeff, value),
		)
		.join(' ');

	return <p className="mb-8 font-serif text-4xl">{`${equation} = 0`}</p>;
}
