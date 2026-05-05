import axios, { CanceledError } from 'axios';
import { useEffect, useState } from 'react';

export function useTmdb<T>(url: string, params?: Record<string, unknown>) {
	const [data, setData] = useState<T | null>();

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				const response = await axios.get<T>(url, {
					baseURL: 'https://api.themoviedb.org/3',
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
					},
					params,
					signal: controller.signal,
				});

				setData(response.data);
			} catch (error) {
				if (!(error instanceof CanceledError)) {
					setData(null);
					console.error(error);
				}
			}
		};

		void fetchData();

		return () => controller.abort();
	}, [url, params]);

	return { data };
}
