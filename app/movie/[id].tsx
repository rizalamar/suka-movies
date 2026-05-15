import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View className="items-center justify-center flex-1 bg-background">
			<Stack.Screen
				options={{
					title: "Movie Detail",
					headerShown: true,
					headerTintColor: "#fff",
					headerStyle: { backgroundColor: "#0f172a" },
				}}
			/>
			<Text className="text-textPrimary ">{id}</Text>
		</View>
	);
}
