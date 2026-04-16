import { Link } from '@/components';

export const Header = () => {
	return (
		<header>
			<nav className="flex gap-4 bg-gray-800 p-4">
				<h1 className="text-white-900 text-2xl font-bold">TMDB Explorer</h1>
				<Link to="/now-playing">Now Playing</Link>
				<Link to="/trending?interval=day">Trending</Link>
				<Link to="/search">Search</Link>
			</nav>
		</header>
	);
};
