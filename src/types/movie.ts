import { Genre } from "./genre";

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	softcore: boolean;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface ProductionCompanies {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountries {
	iso_3166_1: string;
	name: string;
}

export interface Language {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface MovieDetail {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompanies[];
	production_countries: ProductionCountries[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: Language[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
