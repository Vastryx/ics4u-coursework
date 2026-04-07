import { useEffect, useState } from 'react';

import { type CoefficientsType, fields } from '../types';

type CubicInputProps = {
	coefficients: CoefficientsType;
	setCoefficients: React.Dispatch<React.SetStateAction<CoefficientsType>>;
	onSave: () => void;
};

export function CubicInput({ coefficients, setCoefficients, onSave }: CubicInputProps) {
	const toLocalValues = ({ a, b, c, d }: CoefficientsType) => ({
		a: String(a),
		b: String(b),
		c: String(c),
		d: String(d),
	});

	const [localValues, setLocalValues] = useState(() => toLocalValues(coefficients));

	useEffect(() => {
		setLocalValues(toLocalValues(coefficients));
	}, [coefficients]);

	const handleChange = (field: string, raw: string) => {
		setLocalValues((prev) => ({ ...prev, [field]: raw }));
		const parsed = Number(raw);
		setCoefficients((prev) => ({
			...prev,
			[field]: Number.isNaN(parsed) ? 0 : parsed,
		}));
	};

	return (
		<>
			<h1 className="mb-6 text-3xl font-semibold">Cubic Solver</h1>
			<form className="flex flex-col gap-4 md:flex-row">
				{fields.map((key) => {
					return (
						<label key={key} className="flex w-full flex-col gap-1.5 md:flex-1 md:basis-48">
							{key} value:
							<input
								name={key}
								value={localValues[key]}
								type="number"
								onChange={(e) => handleChange(key, e.target.value)}
								className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 focus:border-gray-900 focus:outline-2 focus:outline-offset-1 focus:outline-gray-900"
								required
							/>
						</label>
					);
				})}
				<input
					className="w-full cursor-pointer rounded-xl border border-gray-900 bg-white px-5 py-3 font-semibold md:w-auto"
					type="button"
					value="Save"
					onClick={onSave}
				/>
			</form>
		</>
	);
}
