import { View, Text, FlatList } from "react-native";
import React from "react";
import { useMoviesByGenre } from "../../src/hooks/useMoviesByGenre";
import { SafeAreaView } from "react-native-safe-area-context";

const MoviesScreen = () => {
	const { movies, isLoading, error, isFetchingNextPage, loadMore, hasMore } = useMoviesByGenre(28);
	return (
		<SafeAreaView>
			<View className="flex-1">
				<FlatList
					data={movies}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View>
							<Text>{item.title}</Text>
						</View>
					)}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
				/>
			</View>
		</SafeAreaView>
	);
};

export default MoviesScreen;
