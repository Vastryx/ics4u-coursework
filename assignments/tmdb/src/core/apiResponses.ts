export type PaginatedResponse<T> = {
	results: T[];
	total_pages: number;
};

export type MediaListItem = {
	id: number;
	original_title?: string;
	original_name?: string;
	poster_path: string | null;
};

export type MediaListResponse = PaginatedResponse<MediaListItem>;

export type Video = {
	key: string;
	name: string;
	site: string;
	type: string;
};

export type Season = {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
};

export type MovieResponse = {
	id: number;
	title: string;
	name: string;
	first_air_date: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: string;
	number_of_episodes: number;
	number_of_seasons: number;
	videos?: {
		results: Video[];
	};
	seasons?: Season[];
};

export type CreditsResponse = {
	cast: Array<{
		id: number;
		name: string;
		profile_path: string | null;
		character: string;
	}>;
};

export type ReviewsResponse = {
	results: Array<{
		id: string;
		author: string;
		content: string;
	}>;
};

export type SearchResponse = PaginatedResponse<{
	id: number;
	name: string;
	profile_path: string | null;
	original_title?: string;
	original_name?: string;
	poster_path: string | null;
}> & {
	total_results: number;
};

export type EpisodeResponse = {
	air_date: string;
	episodes: Array<{
		air_date: string;
		episode_number: number;
		id: number;
		name: string;
		overview: string;
		production_code: string;
		runtime: number | null;
		season_number: number;
		show_id: number;
		still_path: string | null;
		vote_average: number;
		vote_count: number;
	}>;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
};

export type PersonResponse = {
	also_known_as: string[];
	biography: string;
	birthday: string | null;
	deathday: string | null;
	gender: number;
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	known_for_department: string;
	name: string;
	place_of_birth: string | null;
	popularity: number;
	profile_path: string | null;
};

export type CareerResponse = {
	cast: Array<{
		adult: boolean;
		character: string;
		credit_id: string;
		episode_count?: number;
		first_air_date?: string;
		id: number;
		media_type: 'movie' | 'tv';
		name?: string;
		order?: number;
		original_name?: string;
		original_title?: string;
		poster_path: string | null;
		release_date?: string;
		title?: string;
	}>;
	crew: Array<{
		adult: boolean;
		credit_id: string;
		department: string;
		episode_count?: number;
		first_air_date?: string;
		id: number;
		job: string;
		media_type: 'movie' | 'tv';
		name?: string;
		original_name?: string;
		original_title?: string;
		poster_path: string | null;
		release_date?: string;
		title?: string;
	}>;
	id: number;
};

export type PersonImagesResponse = {
	id: number;
	profiles: Array<{
		aspect_ratio: number;
		file_path: string;
		height: number;
		iso_639_1: string | null;
		vote_average: number;
		vote_count: number;
		width: number;
	}>;
};
