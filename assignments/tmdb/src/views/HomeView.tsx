import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';

export const HomeView = () => {
	const navigate = useNavigate();

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
			<section className="w-full max-w-3xl space-y-8 text-center">
				<h1 className="text-5xl font-bold tracking-tight">TMDB Explorer</h1>
				<p className="text-lg text-gray-400">
					Explore movies and discover people using a fast, modern interface.
				</p>
				<Button onClick={() => navigate('movies/category/now-playing')}>Enter</Button>
				<footer className="pt-10 text-sm text-gray-500">
					Built with React, Vite and React Router
				</footer>
			</section>
		</main>
	);
};
