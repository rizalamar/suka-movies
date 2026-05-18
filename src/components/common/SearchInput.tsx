import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Search, X } from "lucide-react-native";

interface Props {
	value: string;
	onChangeText: (text: string) => void;
	onClear: () => void;
	placeholder?: string;
}

const SearchInput = ({ value, onChangeText, onClear, placeholder }: Props) => {
	return (
		<View className="flex-row items-center px-4 mx-6 mb-6 border h-14 bg-slate-900/80 rounded-2xl border-slate-800">
			<Search size={20} color={"#94a3b8"} />
			<TextInput
				className="flex-1 ml-3 text-base text-white"
				placeholder={placeholder || "Search movies..."}
				placeholderTextColor={"#64748b"}
				value={value}
				onChangeText={onChangeText}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			{value.length > 0 && (
				<TouchableOpacity onPress={onClear}>
					<X size={20} color={"#94a3b8"} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default SearchInput;
