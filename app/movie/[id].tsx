import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useMovieDetail } from "../../src/hooks/useMovieDetail";
import React, { useMemo } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ReviewItem from "../../src/components/review/ReviewItem";
import MovieHero from "../../src/components/movie/MovieHero";
import MovieAbout from "../../src/components/movie/MovieAbout";
import MovieTrailer from "../../src/components/movie/MovieTrailer";
import EmptyState from "../../src/components/common/EmptyState";

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();
	const { movie, reviews, trailer, isLoading, isFetchingReviews, loadMoreReviews, hasMoreReviews } = useMovieDetail(
		Number(id)
	);

	const ListHeader = useMemo(
		() => (
			<>
				<MovieHero movie={movie} />
				<MovieAbout overview={movie?.overview || "No overview yet"} />
				<MovieTrailer trailer={trailer} />
				<View className="px-6 mb-4">
					<View className="mt-8 h-[1px] bg-slate-800 w-full mb-4" />
					<Text className="text-textPrimary text-lg font-black tracking-[1px] uppercase">
						Audience Reviews
					</Text>
				</View>
			</>
		),
		[movie, trailer]
	);

	if (isLoading || !movie) {
		return (
			<View className="items-center justify-center flex-1 bg-background">
				<ActivityIndicator size={"large"} color={"#e11d48"} />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<Stack.Screen
				options={{
					headerShown: true,
					title: "",
					headerTransparent: true,
					headerTintColor: "#fff",
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => router.back()}
							className="items-center justify-center rounded-full bg-slate-900/60 "
							style={{ paddingVertical: 18, paddingHorizontal: 20, marginTop: 40 }}
						>
							<FontAwesome name="arrow-left" size={24} color="#f8fafc" />
						</TouchableOpacity>
					),
				}}
			/>
			<FlatList
				data={reviews}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				ListHeaderComponent={ListHeader}
				onEndReached={loadMoreReviews}
				onEndReachedThreshold={0.5}
				removeClippedSubviews={true}
				initialNumToRender={5}
				maxToRenderPerBatch={5}
				windowSize={5}
				renderItem={({ item }) => <ReviewItem item={item} />}
				ListEmptyComponent={<EmptyState title="No Reviews Yet" />}
				ListFooterComponent={
					isFetchingReviews && hasMoreReviews ? (
						<ActivityIndicator color={"#e11d48"} className="my-8" size={"small"} />
					) : (
						<View className="h-20" />
					)
				}
			/>
		</View>
	);
}
