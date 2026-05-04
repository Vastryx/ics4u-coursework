import type { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	variant?: 'primary' | 'grey';
	disabled?: boolean;
	onClick: () => void;
};

const baseStyles =
	'inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 disabled:pointer-events-none disabled:opacity-50';
const variants = {
	primary:
		'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500',
	grey: 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-white/5 focus:ring-slate-500',
};

export const Button = ({
	children,
	variant = 'primary',
	disabled = false,
	onClick,
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={`${baseStyles} ${disabled ? variants['grey'] : variants[variant]}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
