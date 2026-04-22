import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import {
	CreditsView,
	ErrorView,
	HomeView,
	MovieView,
	NowPlayingView,
	ReviewsView,
	SearchView,
	TelevisionView,
	TrendingView,
} from '@/views';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route element={<MainLayout />}>
				<Route path="movies/category">
					<Route path=":category" element={<NowPlayingView />} />
				</Route>
				<Route path="tv/category">
					<Route path=":category" element={<TelevisionView />} />
				</Route>
				<Route path="trending">
					<Route path=":category" element={<TrendingView />} />
				</Route>
				<Route path="genre">
					<Route path="movies">
						<Route path="action" element={<NowPlayingView />} />
						<Route path="adventure" element={<NowPlayingView />} />
						<Route path="animation" element={<NowPlayingView />} />
						<Route path="crime" element={<NowPlayingView />} />
						<Route path="family" element={<NowPlayingView />} />
						<Route path="fantasy" element={<NowPlayingView />} />
						<Route path="history" element={<NowPlayingView />} />
						<Route path="horror" element={<NowPlayingView />} />
						<Route path="mystery" element={<NowPlayingView />} />
						<Route path="sci-fi" element={<NowPlayingView />} />
					</Route>
					<Route path="tv">
						<Route path="movies" element={<NowPlayingView />} />
						<Route path="tv" element={<NowPlayingView />} />
					</Route>
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
