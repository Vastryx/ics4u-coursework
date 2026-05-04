import { Button } from '@/components';

type PaginationProps = {
	page: number;
	maxPages: number;
	onClick: (page: number) => void;
};

export const Pagination = ({ page, maxPages, onClick }: PaginationProps) => {
	return (
		<div className="my-8 flex items-center justify-center gap-6">
			<Button variant="grey" onClick={() => onClick(Math.max(page - 1, 1))} disabled={page === 1}>
				Prev
			</Button>
			<p className="font-medium text-slate-300">
				<span className="text-white">{page}</span> / {maxPages}
			</p>
			<Button
				variant="grey"
				onClick={() => onClick(Math.min(page + 1, maxPages))}
				disabled={page === maxPages}
			>
				Next
			</Button>
		</div>
	);
};
