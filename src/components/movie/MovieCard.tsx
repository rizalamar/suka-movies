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
	);
};

export default MovieCard;
