import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
	const navigate = useNavigate();
	return (
		<input
			type="search"
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement>) => {
				onChange(e.target.value);
				navigate(`/search?q=${value}`);
			}}
			placeholder="Search actors, directors..."
			className="w-full rounded-xl border border-gray-700 bg-gray-800 p-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	);
};
