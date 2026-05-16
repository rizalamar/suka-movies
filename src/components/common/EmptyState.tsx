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
			<View className="p-6 mb-6 border rounded-full bg-slate-900 border-slate-800">
				{icon || <Inbox size={40} color={"#475569"} />}
				<Text className="mb-2 text-lg font-bold text-center text-textSecondary">{title}</Text>
				{message && <Text className="text-sm leading-5 text-center text-slate-500">{message}</Text>}
			</View>
		</View>
	);
};

export default EmptyState;
