import { useEffect, useState } from "react";
import { MovieDetail } from "../types/movie";
import { Review } from "../types/review";
import { Video } from "../types/video";
import { movieService } from "../services/movieService.service";

export const useMovieDetail = (movieId: number) => {
	const [movie, setMovie] = useState<MovieDetail | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [trailer, setTrailer] = useState<Video | null>(null);

	const [isLoading, setisLoading] = useState<boolean>(false);
	const [reviewPage, setReviewPage] = useState<number>(1);
	const [hasMoreReviews, setHasMoreReviews] = useState<boolean>(false);
	const [isFetchingReviews, setIsFetchingReviews] = useState<boolean>(false);

	const fetchDetailMovieData = async () => {
		try {
			setisLoading(true);
			const [movieDetailData, videoData, reviewData] = await Promise.all([
				movieService.getMovieDetail(movieId),
				movieService.getMovieVideos(movieId),
				movieService.getMovieReviews(movieId, 1),
			]);

			const ytTrailer = videoData.results.find((v) => v.type === "Trailer" && v.site === "Youtube");

			setMovie(movieDetailData);
			setReviews(reviewData.results);
			setTrailer(ytTrailer || null);

			setHasMoreReviews(1 < (reviewData.total_pages || 0));
		} catch (error) {
			console.error("Error fetching movie details: ", error);
		} finally {
			setisLoading(false);
		}
	};

	const loadMoreReviews = async () => {
		if (isFetchingReviews || !hasMoreReviews) return;
		try {
			setIsFetchingReviews(true);
			const nextPage = reviewPage + 1;
			const res = await movieService.getMovieReviews(movieId, nextPage);

			setReviews((prev) => [...prev, ...res.results]);
			setReviewPage(nextPage);
			setHasMoreReviews(nextPage < (res.total_pages || 0));
		} catch (error) {
			console.error("Error loading more reviews: ", error);
		} finally {
			setIsFetchingReviews(false);
		}
	};

	useEffect(() => {
		if (movieId) {
			fetchDetailMovieData();
		}
	}, [movieId]);

	return {
		movie,
		reviews,
		trailer,
		isLoading,
		loadMoreReviews,
		hasMoreReviews,
		isFetchingReviews,
	};
};
