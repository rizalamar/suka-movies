import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video } from "../../types/video";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "../../constants/movie-detail";

interface MovieTrailerProps {
	trailer: Video | null;
}

const MovieTrailer = ({ trailer }: MovieTrailerProps) => {
	if (!trailer) return null;

	return (
		<View className="px-6 mt-10">
			<View className="h-[1px] bg-slate-800 w-20 self-center mb-8" />
			<Text
				className="text-textPrimary text-lg font-black tracking-[1px] uppercase "
				style={{ paddingBottom: 20 }}
			>
				Watch Trailer
			</Text>

			<TouchableOpacity
				activeOpacity={0.9}
				className="relative overflow-hidden border shadow-2xl rounded-3xl bg-slate-900 border-slate-800"
				style={{
					width: VIDEO_WIDTH,
					minHeight: VIDEO_HEIGHT,
					backgroundColor: "black",
					transform: [{ perspective: 1000 }],
				}}
			>
				<YoutubePlayer
					height={VIDEO_HEIGHT}
					width={VIDEO_WIDTH}
					videoId={trailer.key}
					play={false}
					webViewProps={{
						androidLayerType: "hardware",
						style: {
							opacity: 0.99,
							backgroundColor: "black",
						},
						mediaPlaybackRequiresUserAction: false,
						domStorageEnabled: true,
						javaScriptEnabled: true,
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default MovieTrailer;
