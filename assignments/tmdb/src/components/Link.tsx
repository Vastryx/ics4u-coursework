import type { ReactNode } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

type LinkProps = {
	children: ReactNode;
	to: string;
	match?: string[];
};

export const Link = ({ children, to, match = [] }: LinkProps) => {
	const { pathname } = useLocation();
	const matched = match.some((pattern) => matchPath({ path: pattern, end: false }, pathname));

	return (
		<NavLink
			replace
			to={to}
			className={({ isActive }) =>
				`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
					isActive || matched
						? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20'
						: 'text-slate-400 hover:bg-white/5 hover:text-white'
				}`
			}
		>
			{children}
		</NavLink>
	);
};
