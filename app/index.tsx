import { ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGenres } from "../src/hooks/useGenres";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function MainScreen() {
	const router = useRouter();
	const { genres, isLoading, error, refetch } = useGenres();

	if (isLoading) {
		return (
			<View className="items-center justify-center flex-1 bg-background">
				<ActivityIndicator size="large" color="#e11d48" />
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 bg-background">
				<Text className="text-red-500">{error}</Text>
				<Button title="Retry" onPress={refetch} />
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			<StatusBar style="light" />

			<View className="px-4 pt-4">
				<Text className="mb-2 text-3xl font-bold text-textPrimary">Discover</Text>
				<Text className="mb-6 text-textSecondary">Select a genre to find your next movie</Text>

				<FlatList
					data={genres}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="w-[48%] mb-4 p-6 border shadow-lg bg-surface rounded-2xl border-slate-700 active:opacity-70"
							onPress={() => {
								router.push({
									pathname: "movies-by-genre/[id]",
									params: {
										id: item.id,
										name: item.name,
									},
								});
							}}
						>
							<View className="w-10 h-1 mb-3 rounded-full bg-primary" />
							<Text className="text-lg font-semibold text-textPrimary">{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}
