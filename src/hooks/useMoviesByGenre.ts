import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { movieService } from "../services/movieService.service";

export const useMoviesByGenre = (genreId: number) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(false);

	const fetchMovies = async (pageTofetch: number, isInitial: boolean = false) => {
		if (!isInitial && (isLoading || isFetchingNextPage)) return;

		try {
			if (isInitial) setIsloading(true);
			else setIsFetchingNextPage(true);

			setError(null);
			const res = await movieService.getMoviesByGenre(genreId, pageTofetch);
			setMovies((prev) => {
				const newResult = res.results;
				if (isInitial) return newResult;

				const existingIds = new Set(prev.map((m) => m.id));
				const uniqueNewResults = newResult.filter((m) => !existingIds.has(m.id));

				return [...prev, ...uniqueNewResults];
			});
			setHasMore(pageTofetch < (res.total_pages || 0));
			setPage(pageTofetch);
		} catch (error) {
			setError("Failed to fetch movies");
		} finally {
			setIsloading(false);
			setIsFetchingNextPage(false);
		}
	};

	useEffect(() => {
		setMovies([]);
		setPage(1);
		setHasMore(true);
		fetchMovies(1, true);
	}, [genreId]);

	const loadMore = () => {
		if (!isFetchingNextPage && hasMore) {
			fetchMovies(page + 1);
		}
	};

	const refetch = () => fetchMovies(1, true);

	return { movies, isLoading, error, loadMore, hasMore, isFetchingNextPage, refetch };
};
