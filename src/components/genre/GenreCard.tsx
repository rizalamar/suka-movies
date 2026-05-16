import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Genre } from "../../types/genre";
import { LinearGradient } from "expo-linear-gradient";
import { Clapperboard } from "lucide-react-native";
import { getGenreIcon } from "../../utils/icons";

interface Props {
	item: Genre;
	onPress: () => void;
}

const GenreCard = ({ item, onPress }: Props) => {
	const Icon = getGenreIcon(item.name);

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="w-[48%] mb-4 border rounded-3xl overflow-hidden"
			onPress={onPress}
		>
			<LinearGradient colors={["#1e293b", "#0f172a"]} className="p-6 border border-slate-800">
				<View className="flex-row items-center mb-4">
					<View
						className="p-2.5 rounded-2xl"
						style={{
							backgroundColor: "#e11d48",
							borderRadius: 16,
							padding: 10,
						}}
					>
						<Icon size={30} color={"white"} />
					</View>
					<View className="items-center justify-center flex-1">
						<Text className="text-2xl font-semibold text-textPrimary">{item.name}</Text>
					</View>
				</View>
				<View className="w-8 h-1 mt-4 rounded-full bg-primary" style={{ opacity: 0.5 }} />
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default GenreCard;
