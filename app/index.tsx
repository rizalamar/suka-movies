import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGenres } from "../src/hooks/useGenres";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Film } from "lucide-react-native";
import GenreCard from "../src/components/genre/GenreCard";
import MovieSkeleton from "../src/components/common/MovieSkeleton";
import ErrorState from "../src/components/common/ErrorState";
import EmptyState from "../src/components/common/EmptyState";

export default function MainScreen() {
	const router = useRouter();
	const { genres, isLoading, error, refetch } = useGenres();

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 px-6 bg-background">
				<View className="w-full h-20 mt-4 mb-8 bg-slate-900/50 rounded-2xl" />
				<MovieSkeleton count={genres.length} />
			</SafeAreaView>
		);
	}

	if (error) {
		return <ErrorState message={error} onRetry={refetch} />;
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
					ListEmptyComponent={
						<EmptyState
							title={"No Genres Available"}
							message="Please pull to refresh or try again later."
						/>
					}
				/>
			</View>
		</SafeAreaView>
	);
}
