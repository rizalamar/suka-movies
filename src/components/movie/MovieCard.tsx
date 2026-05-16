import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CARD_WIDTH } from "../../constants/movie-card";
import { IMAGE_BASE_URL } from "../../constants/image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image as RNImage } from "expo-image";
import { router } from "expo-router";
import { Movie } from "../../types/movie";

interface Props {
	item: Movie;
	onPress: () => void;
}

const MovieCard = ({ item, onPress }: Props) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ width: CARD_WIDTH, overflow: "hidden" }}
			className="mb-4 rounded-2xl active:opacity-90"
		>
			<View className="relative">
				{item.poster_path ? (
					<RNImage
						source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
						contentFit="cover"
						style={{
							width: "100%",
							aspectRatio: 2 / 3,
							borderRadius: 8,
						}}
						transition={300}
					/>
				) : (
					<View style={{ width: "100%", aspectRatio: 2 / 3 }} className="items-center justify-center">
						<FontAwesome name="file-image-o" size={24} color="#475569" />
						<Text className="mt-2 text-lg text-slate-500">No Poster</Text>
					</View>
				)}

				{/* Rating */}
				<View
					className="absolute flex-row items-center gap-2 border border-slate-700/50"
					style={{
						backgroundColor: "#1e293b",
						paddingBlock: 4,
						paddingInline: 6,
						top: 8,
						left: 8,
						borderRadius: 8,
					}}
				>
					<FontAwesome name="star" size={18} color="#f59e0b" />
					<Text className="text-lg font-bold text-accent">{item.vote_average.toFixed(1)}</Text>
				</View>
			</View>

			{/* Title  */}
			<View className="items-center p-3">
				<Text className="text-xl font-bold tracking-wider text-center text-textPrimary" numberOfLines={2}>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default MovieCard;
