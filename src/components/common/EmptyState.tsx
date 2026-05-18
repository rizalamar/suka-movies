import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { Inbox } from "lucide-react-native";

interface Props {
	title: string;
	message?: string;
	icon?: ReactNode;
}

const EmptyState = ({ title, message, icon }: Props) => {
	return (
		<View className="items-center justify-center px-10 py-20">
			<View className="items-center p-6">
				{icon || <Inbox size={48} color={"#475569"} />}
				<Text className="mb-2 text-lg font-bold text-center text-textSecondary">{title}</Text>
				{message && <Text className="text-sm leading-5 text-center text-slate-500">{message}</Text>}
			</View>
		</View>
	);
};

export default EmptyState;
