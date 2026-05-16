import { View, Text } from "react-native";
import React from "react";
import { Review } from "../../types/review";

interface Props {
	item: Review;
}

const ReviewItem = ({ item }: Props) => {
	return (
		<View className="px-4 mb-6">
			<View className="p-4 border bg-surface rounded-2xl border-slate-800">
				<View className="flex-row items-center gap-2 mb-2">
					<View className="items-center justify-center p-3 mr-3 rounded-full bg-primary">
						<Text className="font-bold text-textPrimary">{item.author[0].toUpperCase()}</Text>
					</View>

					<View>
						<Text className="font-bold text-textSecondary">{item.author}</Text>
						<Text className="text-xs text-textPrimary">Verified Audience</Text>
					</View>
				</View>

				<Text className="text-sm italic text-textSecondary">"{item.content}"</Text>
			</View>
		</View>
	);
};

export default ReviewItem;
