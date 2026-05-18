import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGenres } from "../src/hooks/useGenres";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Film } from "lucide-react-native";
import GenreCard from "../src/components/genre/GenreCard";
import MovieSkeleton from "../src/components/common/MovieSkeleton";
import ErrorState from "../src/components/common/ErrorState";
import EmptyState from "../src/components/common/EmptyState";
import { useSearchMovies } from "../src/hooks/useSearchMovies";
import SearchInput from "../src/components/common/SearchInput";
import MovieCard from "../src/components/movie/MovieCard";

export default function MainScreen() {
	const router = useRouter();
	const { genres, isLoading, error, refetch } = useGenres();
	const {
		query,
		setQuery,
		movies: searchResults,
		isLoading: isLoadingSearch,
		error: errorSearch,
		loadMore: loadMoreSearch,
		hasMore: hasMoreSearch,
		isFetchingNextPage: isFetchingNextSearch,
		refetch: refetchSearch,
	} = useSearchMovies();
	const isSearching = query.length > 0;

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 px-6 bg-background">
				<View className="w-full h-20 mt-4 mb-8 bg-slate-900/50 rounded-2xl" />
				<MovieSkeleton count={genres.length} />
			</SafeAreaView>
		);
	}

	if (error) {
		return <ErrorState message={error} onRetry={refetch} />;
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			<StatusBar style="light" />

			{/* Header */}
			<View style={{ paddingTop: 32, paddingBottom: 16, paddingInline: 24 }}>
				<View className="flex-row items-center gap-2">
					<View className=" bg-primary rounded-xl" style={{ padding: 8, marginRight: 12 }}>
						<Film size={36} color={"white"} />
					</View>

					<View className="">
						<Text className="text-4xl font-black tracking-tighter text-white uppercase">
							Suka <Text style={{ color: "#E11D48" }}>Movies</Text>
						</Text>
						<Text className="text-xl tracking-wide text-textSecondary">
							Discover your next favorite movies
						</Text>
					</View>
				</View>
			</View>

			{/* SearchInput */}
			<View style={{ paddingTop: 32, paddingBottom: 16, paddingInline: 24 }}>
				<SearchInput value={query} onChangeText={setQuery} onClear={() => setQuery("")} />
			</View>

			<View className="h-[1px] w-full bg-slate-800" />

			{/* Genres */}
			<View className="flex-1 px-6 mt-4">
				{isSearching ? (
					// Search mode
					<>
						<Text className="mb-6 text-2xl font-bold tracking-wider text-textPrimary">Search Results</Text>
						{isLoadingSearch || (query.length > 0 && searchResults.length === 0) ? (
							<MovieSkeleton count={genres.length} />
						) : errorSearch ? (
							<ErrorState message={errorSearch} onRetry={refetchSearch} />
						) : (
							<FlatList
								data={searchResults}
								numColumns={2}
								keyExtractor={(item) => item.id.toString()}
								columnWrapperStyle={{ justifyContent: "space-between", gap: 15 }}
								onEndReached={loadMoreSearch}
								onEndReachedThreshold={0.5}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) => (
									<MovieCard
										item={item}
										onPress={() =>
											router.push({
												pathname: "/movie/[id]",
												params: {
													id: item.id,
												},
											})
										}
									/>
								)}
								ListEmptyComponent={
									<EmptyState title={"No movies found"} message="Try different keywords" />
								}
								ListFooterComponent={
									isFetchingNextSearch ? (
										<ActivityIndicator color={"#E11d48"} className="my-4" />
									) : (
										<View className="h-10" />
									)
								}
							/>
						)}
					</>
				) : (
					// Genres Mode
					<>
						<View className="flex-row items-center justify-between mb-6">
							<Text className="text-2xl font-bold tracking-wider text-textPrimary">Browse Genres</Text>
						</View>
						<FlatList
							data={genres}
							numColumns={2}
							keyExtractor={(item) => item.id.toString()}
							columnWrapperStyle={{ justifyContent: "space-between" }}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<GenreCard
									item={item}
									onPress={() => {
										router.push({
											pathname: "movies-by-genre/[id]",
											params: {
												id: item.id,
												name: item.name,
											},
										});
									}}
								/>
							)}
							ListEmptyComponent={
								!isLoadingSearch && query.length > 0 && searchResults.length === 0 ? (
									<EmptyState
										title={"No Genres Available"}
										message="Please pull to refresh or try again later."
									/>
								) : null
							}
						/>
					</>
				)}
			</View>
		</SafeAreaView>
	);
}
