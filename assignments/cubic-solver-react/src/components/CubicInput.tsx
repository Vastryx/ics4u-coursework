import type { CoefficientsType } from '../types';

type CubicInputProps = {
	coefficients: CoefficientsType;
	setCoefficients: React.Dispatch<React.SetStateAction<CoefficientsType>>;
};

export function CubicInput({ coefficients, setCoefficients }: CubicInputProps) {
	return (
		<>
			<h1 className="text-4xl font-semibold">Cubic Solver</h1>
			<form className="flex gap-4">
				<label className="flex shrink grow basis-3xs flex-col gap-1.5">
					a value:
					<input
						value={coefficients.a}
						onChange={(e) =>
							setCoefficients({ ...coefficients, a: Number(e.target.value) || undefined })
						}
						className="w-full rounded-lg border px-3"
						type="number"
						name="a"
						required
					/>
				</label>
				<label className="flex shrink grow basis-3xs flex-col gap-1.5">
					b value:
					<input
						value={coefficients.b}
						onChange={(e) =>
							setCoefficients({ ...coefficients, b: Number(e.target.value) || undefined })
						}
						className="w-full rounded-lg border px-3"
						type="number"
						name="b"
						required
					/>
				</label>
				<label className="flex shrink grow basis-3xs flex-col gap-1.5">
					c value:
					<input
						value={coefficients.c}
						onChange={(e) =>
							setCoefficients({ ...coefficients, c: Number(e.target.value) || undefined })
						}
						className="w-full rounded-lg border px-3"
						type="number"
						name="c"
						required
					/>
				</label>
				<label className="flex shrink grow basis-3xs flex-col gap-1.5">
					d value:
					<input
						value={coefficients.d}
						onChange={(e) =>
							setCoefficients({ ...coefficients, d: Number(e.target.value) || undefined })
						}
						className="w-full rounded-lg border px-3"
						type="number"
						name="d"
						required
					/>
				</label>
				<input
					className="flex w-auto shrink-0 grow-0 cursor-pointer rounded-lg border border-gray-900 px-5 font-semibold"
					type="button"
					value="Save"
				/>
			</form>
		</>
	);
}
