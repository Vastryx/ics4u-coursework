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
			<h1 className="text-4xl font-semibold">Cubic Solver</h1>
			<form className="flex gap-4" action={handleSubmit}>
				<div className="flex shrink grow basis-3xs flex-col gap-1.5">
					<label htmlFor="a">a value:</label>
					<input className="w-full rounded-lg border px-3" type="number" name="a" required />
				</div>
				<div className="flex shrink grow basis-3xs flex-col gap-1.5">
					<label htmlFor="b">b value:</label>
					<input className="w-full rounded-lg border px-3" type="number" name="b" required />
				</div>
				<div className="flex shrink grow basis-3xs flex-col gap-1.5">
					<label htmlFor="c">c value:</label>
					<input className="w-full rounded-lg border px-3" type="number" name="c" required />
				</div>
				<div className="flex shrink grow basis-3xs flex-col gap-1.5">
					<label htmlFor="d">d value:</label>
					<input className="w-full rounded-lg border px-3" type="number" required />
				</div>
				<input
					className="flex w-auto shrink-0 grow-0 cursor-pointer rounded-lg border border-gray-900 px-5 font-semibold"
					type="submit"
					value="Solve Cubic"
				/>
			</form>
		</>
	);
}
