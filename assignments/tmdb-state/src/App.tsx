import { Route, Routes } from 'react-router-dom';

import { genres, movieCategories, trendingCategories, tvCategories } from '@/core';
import { MainLayout } from '@/layouts';
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
	EpisodeView,
	PersonView,
	CareerView,
	ImagesView,
} from '@/views';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route element={<MainLayout />}>
				<Route path="movies/category">
					<Route index element={<ErrorView />} />
					{movieCategories.map((category) => (
						<Route key={category} path={category} element={<MoviesView category={category} />} />
					))}
				</Route>
				<Route path="tv/category">
					<Route index element={<ErrorView />} />
					{tvCategories.map((category) => (
						<Route
							key={category}
							path={category}
							element={<TelevisionView category={category} />}
						/>
					))}
				</Route>
				<Route path="trending">
					<Route index element={<ErrorView />} />
					{trendingCategories.map((category) => (
						<Route key={category} path={category} element={<TrendingView category={category} />} />
					))}
				</Route>
				<Route path="genre">
					<Route index element={<ErrorView />} />
					{trendingCategories.map((category) =>
						Object.keys(genres[category]).map((genre) => (
							<Route
								key={`${category}-${genre}`}
								path={`${category}/${genre}`}
								element={<GenreView category={category} genre={genre} />}
							/>
						)),
					)}
				</Route>
				<Route path="movie/:id" element={<MovieView />}>
					<Route path="credits" element={<CreditsView />} />
					<Route path="reviews" element={<ReviewsView />} />
					<Route path="trailers" element={<TrailersView />} />
				</Route>
				<Route path="tv/:id" element={<MovieView />}>
					<Route path="seasons" element={<SeasonsView />} />
					<Route path="credits" element={<CreditsView />} />
					<Route path="reviews" element={<ReviewsView />} />
					<Route path="trailers" element={<TrailersView />} />
					<Route path="season/:seasonNumber" element={<EpisodeView />} />
				</Route>
				<Route path="person/:id" element={<PersonView />}>
					<Route index element={<CareerView />} />
					<Route path="career" element={<CareerView />} />
					<Route path="images" element={<ImagesView />} />
				</Route>
				<Route path="search" element={<SearchView />} />
			</Route>
			<Route path="*" element={<ErrorView />} />
		</Routes>
	);
};
