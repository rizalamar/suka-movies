import { useCallback, useEffect, useRef, useState } from "react";
import { MovieDetail } from "../types/movie";
import { Review } from "../types/review";
import { Video } from "../types/video";
import { movieService } from "../services/movieService.service";

export const useMovieDetail = (movieId: number) => {
	const [movie, setMovie] = useState<MovieDetail | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [trailer, setTrailer] = useState<Video | null>(null);

	const [isLoading, setisLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [reviewPage, setReviewPage] = useState<number>(1);
	const [hasMoreReviews, setHasMoreReviews] = useState<boolean>(true);
	const [isFetchingReviews, setIsFetchingReviews] = useState<boolean>(false);
	const isInitialLoad = useRef(true);

	const fetchDetailMovieData = async () => {
		try {
			setisLoading(true);
			setError(null);
			isInitialLoad.current = true;
			const results = await Promise.allSettled([
				movieService.getMovieDetail(movieId),
				movieService.getMovieVideos(movieId),
				movieService.getMovieReviews(movieId, 1),
			]);
			console.log("🚀 ~ fetchDetailMovieData ~ results:", results);

			const movieRes = results[0];
			if (movieRes.status === "fulfilled") {
				setMovie(movieRes.value);
			} else {
				throw new Error("Failed to load movie details");
			}

			const videoRes = results[1];
			if (videoRes.status === "fulfilled") {
				const videoData = videoRes.value;
				const ytTrailer =
					videoData.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
					videoData.results.find((v) => v.type === "Teaser" && v.site === "YouTube");
				setTrailer(ytTrailer || null);
			}

			const reviewsRes = results[2];
			if (reviewsRes.status === "fulfilled") {
				const reviewData = reviewsRes.value;
				setReviews(reviewData.results);
				setHasMoreReviews((reviewData.page ?? 1) < (reviewData.total_pages ?? 1));
			}
		} catch (error) {
			setError("Failed to load movie detail. Please check your connection");
			console.error("Error fetching movie details: ", error);
		} finally {
			setisLoading(false);
			isInitialLoad.current = false;
		}
	};

	const loadMoreReviews = useCallback(async () => {
		if (isLoading || isFetchingReviews || !hasMoreReviews || isInitialLoad.current) return;

		try {
			setIsFetchingReviews(true);
			const nextPage = reviewPage + 1;
			const res = await movieService.getMovieReviews(movieId, nextPage);

			if (res.results.length > 0) {
				setReviews((prev) => [...prev, ...res.results]);
				setReviewPage(nextPage);
				setHasMoreReviews(nextPage < (res.total_pages ?? nextPage));
			} else {
				setHasMoreReviews(false);
			}
		} catch (error) {
			console.error("Error loading more reviews: ", error);
		} finally {
			setIsFetchingReviews(false);
		}
	}, [isFetchingReviews, hasMoreReviews, reviewPage, reviews]);

	useEffect(() => {
		if (movieId) {
			fetchDetailMovieData();
		}
	}, [movieId]);

	return {
		movie,
		reviews,
		trailer,
		error,
		refetch: fetchDetailMovieData,
		isLoading,
		loadMoreReviews,
		hasMoreReviews,
		isFetchingReviews,
	};
};
