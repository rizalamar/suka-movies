import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGenres } from "../src/hooks/useGenres";

export default function MainScreen() {
	const { genres, isLoading, error, refetch } = useGenres();

	// Logika: Jika sedang loading, tampilkan indikator putar
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text>Loading Genres...</Text>
			</View>
		);
	}

	// Logika: Jika ada error, tampilkan pesan error dan tombol retry (menggunakan refetch)
	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ color: "red" }}>{error}</Text>
				<Button title="Retry" onPress={refetch} />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ padding: 20 }}>
				<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Movie Genres</Text>

				{/* Menggunakan FlatList untuk menampilkan data secara efisien */}
				<FlatList
					data={genres}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
							<Text style={{ fontSize: 18 }}>{item.name}</Text>
							<Text style={{ fontSize: 12, color: "gray" }}>ID: {item.id}</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}
