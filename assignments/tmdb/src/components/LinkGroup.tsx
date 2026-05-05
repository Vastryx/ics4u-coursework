import { Link } from '@/components';
import type { LinkGroupProps } from '@/core/types';

export const LinkGroup = ({ options }: LinkGroupProps) => {
	return (
		<div className="flex gap-6">
			{options.map((option) => (
				<Link key={option.label} to={option.to} match={option.match}>
					{option.label}
				</Link>
			))}
		</div>
	);
};
