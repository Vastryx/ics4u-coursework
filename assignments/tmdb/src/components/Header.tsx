import { Link } from '@/components';

export const Header = () => {
	return (
		<header>
			<nav className="flex gap-4 bg-gray-800 p-4">
				<h1 className="text-white-900 text-2xl font-bold">TMDB Explorer</h1>
				<Link to="/movies/category/now-playing" match={['/movies/category']}>
					Movies
				</Link>
				<Link to="/tv/category/airing-today" match={['/tv/category/']}>
					TV
				</Link>
				<Link to="/trending/movies?interval=day" match={['/trending']}>
					Trending
				</Link>
				<Link to="/genre/movies/action" match={['/genre']}>
					Genre
				</Link>
			</nav>
		</header>
	);
};
