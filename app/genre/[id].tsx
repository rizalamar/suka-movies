import { View, Text, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useMoviesByGenre } from "../../src/hooks/useMoviesByGenre";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Image as RNImage } from "expo-image";
import { IMAGE_BASE_URL } from "../../src/constants/image";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 44) / 2;

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
							<TouchableOpacity
								onPress={() => {
									router.push({
										pathname: "movie/[id]",
										params: {
											id: item.id,
										},
									});
								}}
								style={{ width: CARD_WIDTH }}
								className="bg-surface w-[48%] mb-4 rounded-xl overflow-hidden border border-slate-800 active:opacity-90"
							>
								{item.poster_path ? (
									<RNImage
										source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
										contentFit="cover"
										style={{
											width: "100%",
											aspectRatio: 2 / 3,
										}}
										transition={300}
									/>
								) : (
									<View className="items-center justify-center flex-1">
										<Text className="text-sm text-textSecondary">No Image</Text>
									</View>
								)}

								<View className="p-3">
									<Text className="font-bold text-textPrimary" numberOfLines={1}>
										{item.title}
									</Text>
									<View className="flex-row items-center mt-2">
										<View className="flex-row items-center gap-2">
											<FontAwesome name="star" size={18} color="#f59e0b" />
											<Text className="text-sm text-accent">{item.vote_average.toFixed(1)}</Text>
										</View>

										<View className="w-1 h-1 mx-2 rounded-full bg-slate-800" />
										<Text className="text-sm text-textSecondary">{item.release_date}</Text>
									</View>
								</View>
							</TouchableOpacity>
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
