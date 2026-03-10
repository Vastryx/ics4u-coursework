import type { CoefficientsType } from '../types';

type CubicInputProps = {
	set: React.Dispatch<React.SetStateAction<CoefficientsType | undefined>>;
};

export function CubicInput({ set }: CubicInputProps) {
	function handleSubmit(formData: FormData) {
		const [a, b, c, d] = formData.values().map(Number);
		set({
			a,
			b,
			c,
			d,
		});
	}

	return (
		<>
			<h1 className="font-semibold text-4xl">Cubic Solver</h1>
			<form className="flex gap-4" action={handleSubmit}>
				<div className="flex gap-1.5 flex-col grow shrink basis-3xs">
					<label htmlFor="a">a value:</label>
					<input className="w-full px-3 border rounded-lg" type="number" name="a" required />
				</div>
				<div className="flex gap-1.5 flex-col grow shrink basis-3xs">
					<label htmlFor="b">b value:</label>
					<input className="w-full px-3 border rounded-lg" type="number" name="b" required />
				</div>
				<div className="flex gap-1.5 flex-col grow shrink basis-3xs">
					<label htmlFor="c">c value:</label>
					<input className="w-full px-3 border rounded-lg" type="number" name="c" required />
				</div>
				<div className="flex gap-1.5 flex-col grow shrink basis-3xs">
					<label htmlFor="d">d value:</label>
					<input className="w-full px-3 border rounded-lg" type="number" required />
				</div>
				<input
					className="flex grow-0 shrink-0 w-auto font-semibold border-gray-900 border cursor-pointer px-5 rounded-lg"
					type="submit"
					value="Solve Cubic"
				/>
			</form>
		</>
	);
}
