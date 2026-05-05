import { useSearchParams } from 'react-router-dom';

const getPage = (value: string | null) => {
	const page = Number(value ?? 1);
	return Number.isInteger(page) && page > 0 ? page : 1;
};

export const usePageParam = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = getPage(searchParams.get('page'));

	const setPage = (nextPage: number) => {
		const nextParams = new URLSearchParams(searchParams);

		if (nextPage <= 1) {
			nextParams.delete('page');
		} else {
			nextParams.set('page', String(nextPage));
		}

		setSearchParams(nextParams);
	};

	return [page, setPage] as const;
};
