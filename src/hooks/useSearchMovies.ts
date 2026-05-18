import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { Movie } from "../types/movie";
import { movieService } from "../services/movieService.service";

export const useSearchMovies = (initialQuery: string = "") => {
	const [query, setQuery] = useState<string>(initialQuery);
	const debouncedQuery = useDebounce(query, 500);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(false);

	const fetchMovies = async (queryToSeach: string, pageToFetch: number, isInitial: boolean = false) => {
		if (!queryToSeach) {
			setMovies([]);
			setHasMore(false);
			return;
		}

		try {
			if (isInitial) {
				setIsLoading(true);
				setPage(1);
			} else {
				setIsFetchingNextPage(true);
			}

			setError(null);
			const res = await movieService.searchMovies(queryToSeach, pageToFetch);

			setMovies((prev) => {
				const newResults = res.results;
				if (isInitial) return newResults;

				const existingIds = new Set(prev.map((m) => m.id));
				const uniqueNewResults = newResults.filter((m) => !existingIds.has(m.id));
				return [...prev, ...uniqueNewResults];
			});

			setHasMore(pageToFetch < (res.total_pages || 0));
			setPage(pageToFetch);
		} catch (error) {
			setError("Failed to search movies. Please try again");
			console.error(error);
		} finally {
			setIsLoading(false);
			setIsFetchingNextPage(false);
		}
	};

	useEffect(() => {
		if (debouncedQuery) {
			fetchMovies(debouncedQuery, 1, true);
		} else {
			setMovies([]);
			setHasMore(false);
		}
	}, [debouncedQuery]);

	const loadMore = () => {
		if (!isFetchingNextPage && hasMore && debouncedQuery) {
			fetchMovies(debouncedQuery, page + 1);
		}
	};

	const refetch = () => {
		if (debouncedQuery) fetchMovies(debouncedQuery, 1, true);
	};

	return {
		query,
		setQuery,
		movies,
		isLoading,
		error,
		loadMore,
		hasMore,
		isFetchingNextPage,
		refetch,
	};
};
