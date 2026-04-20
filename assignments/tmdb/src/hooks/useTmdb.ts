import axios from 'axios';
import { useEffect, useState } from 'react';

export function useTmdb<T>(path: string, params: Record<string, any>, deps: any[]) {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				const response = await axios.get<T>(path, {
					baseURL: 'https://api.themoviedb.org/3',
					auth: null,
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
					},
					params: {
						...params,
					},
					signal: controller.signal,
				});

				setData(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		void fetchData();

		return () => controller.abort();
	}, deps);

	return { data };
}
