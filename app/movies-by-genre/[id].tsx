import { View, Text, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useMoviesByGenre } from "../../src/hooks/useMoviesByGenre";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { IMAGE_BASE_URL } from "../../src/constants/image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MovieCard from "../../src/components/movie/MovieCard";

const MoviesScreen = () => {
	const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
	const { movies, isLoading, error, isFetchingNextPage, loadMore, hasMore } = useMoviesByGenre(Number(id));
	return (
		<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
			<Stack.Screen
				options={{
					title: name,
					headerShown: true,
					headerTintColor: "#fff",
					headerStyle: { backgroundColor: "#0f172a" },
				}}
			/>

			<View className="flex-1 px-4">
				{isLoading ? (
					<ActivityIndicator size={"large"} color={"#e11d48"} className="mt-10" />
				) : (
					<FlatList
						data={movies}
						numColumns={2}
						keyExtractor={(item) => item.id.toString()}
						columnWrapperStyle={{ justifyContent: "space-between" }}
						onEndReached={loadMore}
						contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
						onEndReachedThreshold={0.5}
						renderItem={({ item }) => (
							<MovieCard
								item={item}
								onPress={() => {
									router.push({
										pathname: "movie/[id]",
										params: {
											id: item.id,
										},
									});
								}}
							/>
						)}
						ListFooterComponent={
							isFetchingNextPage ? (
								<ActivityIndicator color={"#e11d48"} className="my-4" />
							) : (
								<View className="h-10" />
							)
						}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default MoviesScreen;
