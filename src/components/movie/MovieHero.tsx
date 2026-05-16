import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { MovieDetail } from "../../types/movie";
import { IMAGE_BASE_URL } from "../../constants/image";
import { SCREEN_HEIGHT } from "../../constants/movie-detail";

interface MovieHeroProps {
	movie: MovieDetail | null;
}

const MovieHero = ({ movie }: MovieHeroProps) => {
	return (
		<View style={{ height: SCREEN_HEIGHT * 0.6 }}>
			{/* Backdrop */}
			<Image
				source={{ uri: `${IMAGE_BASE_URL}${movie?.poster_path || movie?.backdrop_path}` }}
				contentFit="cover"
				style={StyleSheet.absoluteFill}
				transition={500}
			/>

			<BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

			<LinearGradient style={styles.gradient} colors={["transparent", "rgba(15, 23, 42, 0.8)", "#0f172a"]} />

			{/* Floating Poster & Main Info */}
			<View className="absolute bottom-0 left-0 right-0 px-6">
				<View className="mb-6">
					<Image
						source={{ uri: `${IMAGE_BASE_URL}${movie?.poster_path}` }}
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

				<Text className="mb-3 text-4xl font-black leading-tight text-textPrimary">{movie?.title}</Text>

				<View className="flex-row items-center self-start px-3 py-2 mb-3 border bg-slate-900/50 rounded-xl border-slate-700">
					<Text className="text-lg font-bold text-accent">★ {movie?.vote_average.toFixed(1)}</Text>
					<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
					<Text className="font-medium text-slate-300">{movie?.runtime} MIN</Text>
					<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
					<Text className="font-medium text-slate-300">{movie?.release_date.split("-")[0]}</Text>
					<View className="w-1 h-1 mx-3 rounded-full bg-slate-500" />
					<Text className="font-medium uppercase text-slate-300">{movie?.original_language}</Text>
				</View>

				{/* GENRES */}
				<View className="flex-row flex-wrap gap-2">
					{movie?.genres.map((g) => (
						<View key={g.id} className="bg-primary border border-primary/50 px-4 py-1.5 rounded-full">
							<Text className="text-textPrimary text-[10px] font-bold tracking-widest uppercase">
								{g.name}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	gradient: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: SCREEN_HEIGHT * 0.4,
	},
});

export default MovieHero;
