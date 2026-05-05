import { useNavigate } from 'react-router-dom';

import { Button, Footer } from '@/components';

export const HomeView = () => {
	const navigate = useNavigate();

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-100">
			<section className="w-full max-w-4xl space-y-10 px-4 text-center">
				<div className="space-y-4">
					<h1 className="bg-clip-text pb-2 text-6xl font-extrabold tracking-tight sm:text-7xl">
						TMDB Explorer
					</h1>
					<p className="mx-auto max-w-2xl text-xl text-slate-400">
						Explore movies, TV shows, and discover people using a fast, modern interface built with
						the power of React.
					</p>
				</div>
				<Button onClick={() => navigate('movies/category/now-playing')}>Start Exploring</Button>
				<Footer />
			</section>
		</main>
	);
};
