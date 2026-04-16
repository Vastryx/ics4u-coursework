import type { ChangeEvent } from 'react';

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
	return (
		<div>
			<h1 className="mb-4 text-3xl font-bold">Search</h1>
			<input
				type="search"
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					onChange(e.target.value);
				}}
				placeholder="Search actors, directors..."
				className="w-full rounded-xl border border-gray-700 bg-gray-800 p-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
	);
};
