import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Review } from "../../types/review";
import { BadgeCheck } from "lucide-react-native";
import { Image } from "expo-image";
import { IMAGE_BASE_URL } from "../../constants/image";
import { formatDateTime } from "../../utils/formatDate";
import { getAvatarColor } from "../../utils/avatarColor";

interface Props {
	item: Review;
}

const ReviewItem = ({ item }: Props) => {
	const avatar = getAvatarColor(item.author);
	const { date, time } = formatDateTime(item.created_at);

	return (
		<View className="px-4 mb-6">
			<View className="overflow-hidden border bg-surface rounded-3xl border-slate-800">
				{/* Main Content */}
				<View className="p-6">
					{/* Header */}
					<View className="flex-row items-start gap-2 mb-3">
						{/* Avatar */}
						<View
							className="items-center justify-center rounded-2xl"
							style={{ backgroundColor: avatar.bg, width: 50, height: 50 }}
						>
							{item.author_details.avatar_path ? (
								<Image
									source={{ uri: `${IMAGE_BASE_URL}${item.author_details.avatar_path}` }}
									contentFit="cover"
									style={{ width: "100%", height: "100%", borderRadius: 12 }}
								/>
							) : (
								<View>
									<Text className="font-bold" style={{ color: avatar.text }}>
										{item.author[0]}
									</Text>
								</View>
							)}
						</View>

						{/* Author Info */}
						<View className="flex-1">
							<View className="flex-row items-center gap-2">
								<Text className="text-xl font-bold text-textPrimary">{item.author}</Text>
								<BadgeCheck size={20} color="#4299e1" />
							</View>
							<Text className="text-base font-semibold text-textSecondary">
								{item.author_details.username}
							</Text>
						</View>

						{/* Created reviews */}
						<View className="flex-row items-center gap-2">
							<Text className="text-sm text-textPrimary mt-0.5">{time}</Text>
							<Text className="text-base font-medium text-textPrimary">{date}</Text>
						</View>
					</View>
				</View>

				{/* Review Text */}
				<View className="px-6">
					<Text className="text-sm italic leading-relaxed text-slate-400">"{item.content}"</Text>
				</View>

				{/* Footer */}
				<View className="flex-row items-center justify-between px-4 py-2.5 border-t border-slate-800"></View>
			</View>
		</View>
	);
};

export default ReviewItem;
