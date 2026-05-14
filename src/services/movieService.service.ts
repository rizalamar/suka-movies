import api from "../api/api";
import { ApiResponse } from "../types/common";
import { GenreResponse } from "../types/genre";
import { Movie, MovieDetail } from "../types/movie";
import { ReviewResponse } from "../types/review";
import { Video, VideoResponse } from "../types/video";

export const movieService = {
	getGenres: async (): Promise<GenreResponse> => {
		const res = await api.get<GenreResponse>(`/genre/movie/list`);
		return res.data;
	},
	getMoviesByGenre: async (genreId: number, page: number = 1): Promise<ApiResponse<Movie[]>> => {
		const res = await api.get<ApiResponse<Movie[]>>("/discover/movie", {
			params: {
				with_genres: genreId,
				page: page,
			},
		});
		return res.data;
	},
	getMovieDetail: async (movieId: number): Promise<MovieDetail> => {
		const res = await api.get<MovieDetail>(`/movie/${movieId}`);
		return res.data;
	},
	getMovieReviews: async (movieId: number, page: number = 1): Promise<ReviewResponse> => {
		const res = await api.get<ReviewResponse>(`/movie/${movieId}/reviews`, {
			params: { page },
		});
		return res.data;
	},
	getMovieVideos: async (movieId: number): Promise<VideoResponse> => {
		const res = await api.get<VideoResponse>(`/movie/${movieId}/videos`);
		return res.data;
	},
};
