import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, Dimensions, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useMovieDetail } from "../../src/hooks/useMovieDetail";
import { Image, Image as RNImage } from "expo-image";
import { IMAGE_BASE_URL } from "../../src/constants/image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { SCREEN_HEIGHT, VIDEO_HEIGHT, VIDEO_WIDTH } from "../../src/constants/movie-detail";
import ReviewItem from "../../src/components/review/ReviewItem";

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();
	const { movie, reviews, trailer, isLoading, isFetchingReviews, loadMoreReviews, hasMoreReviews } = useMovieDetail(
		Number(id)
	);

	if (isLoading || !movie) {
		return (
			<View className="items-center justify-center flex-1 bg-background">
				<ActivityIndicator size={"large"} color={"#e11d48"} />
			</View>
		);
	}

	// Header Component
	const renderHeader = () => {
		return (
			<View className="pb-8">
				{/* Blurred Backdrop */}
				<View style={{ height: SCREEN_HEIGHT * 0.6 }}>
					<RNImage
						source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}` }}
						contentFit="cover"
						blurRadius={1}
						style={StyleSheet.absoluteFill}
						transition={500}
					/>

					<BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

					<LinearGradient
						style={styles.gradient}
						colors={["transparent", "rgba(15, 23, 42, 0.8)", "#0f172a"]}
					/>

					{/* FLoating Poster */}
					<View className="absolute bottom-0 left-0 right-0 px-6">
						<View className="mb-6">
							<Image
								source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
								contentFit="cover"
								style={{
									height: SCREEN_HEIGHT * 0.42,
									aspectRatio: 2 / 3,
									borderRadius: 16,
									borderWidth: 1.5,
									borderColor: "rgba(255,255,255,0.15)",
								}}
							/>
						</View>

						<Text className="mb-3 text-4xl font-black leading-tight text-textPrimary">{movie.title}</Text>

						<View className="flex-row items-center self-start px-3 py-2 mb-3 border bg-slate-900/50 rounded-xl border-slate-700">
							<Text className="text-lg font-bold text-accent">★ {movie.vote_average.toFixed(1)}</Text>
							<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
							<Text className="font-medium text-slate-300">{movie.runtime} MIN</Text>
							<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
							<Text className="font-medium text-slate-300">{movie.release_date.split("-")[0]}</Text>
							<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
							<Text className="font-medium text-slate-300">{movie.original_language}</Text>
							<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
							<Text className="font-medium text-slate-300">{movie.origin_country}</Text>
						</View>

						{/* GENRES */}
						<View className="flex-row flex-wrap gap-2">
							{movie.genres.map((g) => (
								<View
									key={g.id}
									className="bg-primary border border-primary/50 px-4 py-1.5 rounded-full"
								>
									<Text className="text-textPrimary text-[10px] font-bold tracking-widest uppercase">
										{g.name}
									</Text>
								</View>
							))}
						</View>
					</View>
				</View>

				{/* CONTENT SECTION */}
				<View className="px-6 mt-3">
					{/* SYNOPSIS */}
					<View className="mt-8">
						<Text className="text-textPrimary text-lg font-black tracking-[1px] uppercase mb-3">
							About Movie
						</Text>
						<Text className="text-base leading-7 text-justify text-slate-400">{movie.overview}</Text>
					</View>
				</View>

				{/* VIDEO SECTION */}
				{trailer && (
					<View className="px-6 mt-10">
						<View className="h-[1px] bg-slate-800 w-20 self-center mb-8" />
						<Text
							className="text-textPrimary text-lg font-black tracking-[1px] uppercase "
							style={{ paddingBlock: 20 }}
						>
							Watch Trailer
						</Text>

						<TouchableOpacity
							activeOpacity={0.9}
							className="relative overflow-hidden border shadow-2xl rounded-3xl bg-slate-900 border-slate-800"
							style={{
								width: VIDEO_WIDTH,
								minHeight: VIDEO_HEIGHT,
								backgroundColor: "black",
								transform: [{ perspective: 1000 }],
							}}
						>
							<YoutubePlayer
								height={VIDEO_HEIGHT}
								width={VIDEO_WIDTH}
								videoId={trailer.key}
								play={false}
								webViewProps={{
									androidLayerType: "hardware",
									style: {
										opacity: 0.99,
										backgroundColor: "black",
									},
									mediaPlaybackRequiresUserAction: false,
									domStorageEnabled: true,
									javaScriptEnabled: true,
								}}
							/>
						</TouchableOpacity>
					</View>
				)}

				<View className="px-6">
					<View className="mt-8 h-[1px] bg-slate-800 w-full mb-4" />
					<Text className="text-textPrimary text-lg font-black tracking-[1px] uppercase">
						Audience Reviews
					</Text>
				</View>
			</View>
		);
	};

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
							style={{ paddingBlock: 18, paddingInline: 20, marginTop: 40 }}
						>
							<FontAwesome name="arrow-left" size={24} color="#f8fafc" />
						</TouchableOpacity>
					),
				}}
			/>
			<FlatList
				data={reviews}
				keyExtractor={(item) => item.id.toString()}
				ListHeaderComponent={renderHeader}
				onEndReached={loadMoreReviews}
				onEndReachedThreshold={0.1}
				renderItem={({ item }) => <ReviewItem item={item} />}
				ListEmptyComponent={
					!isLoading && <Text className="px-4 text-center text-textSecondary">No reviews yet</Text>
				}
				ListFooterComponent={
					isFetchingReviews ? (
						<ActivityIndicator color={"#e11d48"} className="my-4" />
					) : (
						<View className="h-20" />
					)
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	gradient: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: SCREEN_HEIGHT * 0.4, // Gradasi mengambil 40% dari tinggi hero
	},
});
