import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View className="items-center justify-center flex-1 bg-slate-100">
				<Text className="text-2xl font-bold text-red-500">Welcome to Nativewind!</Text>
			</View>
		</SafeAreaView>
	);
}
