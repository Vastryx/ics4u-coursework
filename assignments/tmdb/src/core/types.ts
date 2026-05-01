export type Response = {
	results: Array<{
		id: number;
		original_title?: string;
		original_name?: string;
		poster_path: string;
	}>;
	total_pages: number;
};

export type MovieRepsonse = {
	id: number;
	title: string;
	name: string;
	first_air_date: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	vote_average: string;
	number_of_episodes: number;
	number_of_seasons: number;
	videos?: {
		results: Array<{
			key: string;
			name: string;
			site: string;
			type: string;
		}>;
	};
	seasons?: Array<{
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
		vote_average: number;
	}>;
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

export type SearchResponse = {
	results: Array<{
		id: number;
		name: string;
		profile_path: string | null;
		original_title?: string;
		original_name?: string;
		poster_path: string;
	}>;
	total_pages: number;
	total_results: number;
};
