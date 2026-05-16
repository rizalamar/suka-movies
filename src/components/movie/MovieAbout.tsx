import React from "react";
import { View, Text } from "react-native";

interface MovieAboutProps {
	overview: string | null;
}

const MovieAbout = ({ overview }: MovieAboutProps) => {
	return (
		<View className="px-6 mt-3">
			<View className="mt-8">
				<Text className="text-textPrimary text-lg font-black tracking-[1px] uppercase mb-3">About Movie</Text>
				<Text className="text-base leading-7 text-justify text-slate-400">{overview}</Text>
			</View>
		</View>
	);
};

export default MovieAbout;
