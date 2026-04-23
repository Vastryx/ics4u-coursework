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
} from '@/views';

import { GenreView } from './views/movies/GenreView';

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
				<Route path=":id" element={<MovieView />}>
					<Route path="credits" element={<CreditsView />} />
					<Route path="reviews" element={<ReviewsView />} />
				</Route>
			</Route>
			<Route path="*" element={<ErrorView />} />
		</Routes>
	);
};
