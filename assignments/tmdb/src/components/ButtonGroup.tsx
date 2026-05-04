type ButtonGroupProps = {
	value: string;
	options: Array<{
		label: string;
		value: string;
	}>;
	onClick: (value: string) => void;
};

export const ButtonGroup = ({ value, options, onClick }: ButtonGroupProps) => {
	return (
		<div className="inline-flex rounded-full bg-slate-800/50 p-1 shadow-inner ring-1 ring-white/10">
			{options.map((option) => (
				<button
					key={option.value}
					onClick={() => onClick(option.value)}
					className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
						value === option.value
							? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
							: 'text-slate-400 hover:text-white'
					}`}
				>
					{option.label}
				</button>
			))}
		</div>
	);
};
