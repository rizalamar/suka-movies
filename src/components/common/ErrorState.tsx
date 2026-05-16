import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react-native";

interface Props {
	message: string;
	onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: Props) => {
	return (
		<View className="flex-1 items-center justify-center bg-[#0f172a] px-10">
			<View className="p-6 mb-6 rounded-full bg-primary/10">
				<AlertCircle size={48} color={"#e11d48"} />
			</View>
			<Text className="mb-2 text-xl font-black tracking-widest text-center text-white uppercase">
				Opps! Something went wrong
			</Text>
			<Text className="mb-10 leading-5 text-center text-textSecondary">
				{message || "We encountered an unexpected error. Please check your connection."}
			</Text>
			<TouchableOpacity onPress={onRetry} className="flex-row items-center px-8 py-4 bg-primary rounded-2xl">
				<RefreshCcw size={20} color={"white"} />
				<Text className="ml-3 font-bold tracking-widest text-white uppercase">Try Again</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ErrorState;
