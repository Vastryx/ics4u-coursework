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
				{['a', 'b', 'c', 'd'].map((coeff) => {
					return (
						<label className="flex shrink grow basis-3xs flex-col gap-1.5">
							{coeff} value:
							<input
								value={coefficients[coeff]}
								onChange={(e) => {
									if (Number.isFinite(e.target.valueAsNumber)) {
										setCoefficients({ ...coefficients, [coeff]: e.target.valueAsNumber });
									} else {
										setCoefficients({ ...coefficients, [coeff]: undefined });
									}
								}}
								className="w-full rounded-lg border px-3"
								type="number"
								name={coeff}
								key={coeff}
								required
							/>
						</label>
					);
				})}
				<input
					className="flex w-auto shrink-0 grow-0 cursor-pointer rounded-lg border border-gray-900 px-5 font-semibold"
					type="button"
					value="Save"
				/>
			</form>
		</>
	);
}
