import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { CARD_WIDTH } from "../../constants/movie-card";

const SkeletonCard = () => {
	const opacity = useRef(new Animated.Value(0.3)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
				Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
			])
		).start();
	}, []);

	return (
		<View
			style={{ width: CARD_WIDTH }}
			className="mb-4 overflow-hidden rounded-2xl bg-[#1e293b] border border-slate-800"
		>
			<Animated.View style={[{ height: "100%", aspectRatio: 2 / 3, backgroundColor: "#334155", opacity }]} />
			<View className="p-3">
				<Animated.View
					style={{ height: 14, width: "80%", backgroundColor: "#334155", borderRadius: 4, opacity }}
				/>
				<Animated.View
					style={{
						height: 14,
						width: "40%",
						backgroundColor: "#334155",
						borderRadius: 4,
						marginTop: 8,
						opacity,
					}}
				/>
			</View>
		</View>
	);
};

const MovieSkeleton = ({ count = 6 }: { count?: number }) => {
	return (
		<View className="flex-row flex-wrap justify-between">
			{Array.from({ length: count }).map((_, i) => (
				<SkeletonCard key={i} />
			))}
		</View>
	);
};

export default MovieSkeleton;
