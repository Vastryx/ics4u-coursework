import { useNavigate } from 'react-router-dom';

import { LinkGroup, SearchBar } from '@/components';

export const Header = () => {
	const navigate = useNavigate();
	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
			<nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-8">
					<h1
						onClick={() => navigate('/')}
						className="bg-linear-to-r bg-clip-text text-xl font-extrabold tracking-tight hover:cursor-pointer"
					>
						TMDB Explorer
					</h1>
					<div className="hidden items-center gap-1 md:flex">
						<LinkGroup
							options={[
								{
									label: 'Movies',
									to: '/movies/category/now-playing',
									match: ['/movies/category'],
								},
								{
									label: 'TV',
									to: '/tv/category/airing-today',
									match: ['/tv/category/'],
								},
								{
									label: 'Trending',
									to: '/trending/movies?interval=day',
									match: ['/trending'],
								},
								{
									label: 'Genre',
									to: '/genre/movies/action',
									match: ['/genre'],
								},
							]}
						/>
					</div>
				</div>
				<div className="w-full max-w-md flex-1">
					<SearchBar />
				</div>
			</nav>
		</header>
	);
};
