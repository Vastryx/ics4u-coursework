import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import {
	CreditsView,
	ErrorView,
	HomeView,
	MovieView,
	MoviesView,
	ReviewsView,
	SearchView,
	TelevisionView,
	TrendingView,
	GenreView,
	TrailersView,
	SeasonsView,
} from '@/views';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route element={<MainLayout />}>
				<Route path="movies/category">
					<Route path=":category" element={<MoviesView />} />
				</Route>
				<Route path="tv/category">
					<Route path=":category" element={<TelevisionView />} />
				</Route>
				<Route path="trending">
					<Route path=":category" element={<TrendingView />} />
				</Route>
				<Route path="genre">
					<Route path=":category/:genre" element={<GenreView />} />
				</Route>
				<Route path=":category/:id" element={<MovieView />}>
					<Route path="credits" element={<CreditsView />} />
					<Route path="reviews" element={<ReviewsView />} />
					<Route path="trailers" element={<TrailersView />} />
					<Route path="seasons" element={<SeasonsView />} />
				</Route>
				<Route path="search" element={<SearchView />} />
			</Route>
			<Route path="*" element={<ErrorView />} />
		</Routes>
	);
};
