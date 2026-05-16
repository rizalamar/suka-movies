import { ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGenres } from "../src/hooks/useGenres";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Film } from "lucide-react-native";
import GenreCard from "../src/components/genre/GenreCard";

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

			{/* Header */}
			<View style={{ paddingTop: 32, paddingBottom: 16, paddingInline: 24 }}>
				<View className="flex-row items-center gap-2">
					<View className=" bg-primary rounded-xl" style={{ padding: 8, marginRight: 12 }}>
						<Film size={36} color={"white"} />
					</View>

					<View className="">
						<Text className="text-4xl font-black tracking-tighter text-white uppercase">
							Suka <Text style={{ color: "#E11D48" }}>Movies</Text>
						</Text>
						<Text className="text-xl tracking-wide text-textSecondary">
							Discover your next favorite movies
						</Text>
					</View>
				</View>
			</View>

			<View className="h-[1px] w-full bg-slate-800" />

			{/* Genres */}
			<View className="flex-1 px-6 mt-4">
				<View className="flex-row items-center justify-between mb-6">
					<Text className="text-2xl font-bold tracking-wider text-textPrimary">Browse Genres</Text>
				</View>
				<FlatList
					data={genres}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					columnWrapperStyle={{ justifyContent: "space-between" }}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<GenreCard
							item={item}
							onPress={() => {
								router.push({
									pathname: "movies-by-genre/[id]",
									params: {
										id: item.id,
										name: item.name,
									},
								});
							}}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}
