import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="movie/[id]" options={{ headerShown: false, title: "Movies" }} />
			</Stack>
		</SafeAreaProvider>
	);
}
