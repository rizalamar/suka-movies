import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const PADDING = 48; // px-6 kiri + px-6 kanan = 24 + 24
export const VIDEO_WIDTH = SCREEN_WIDTH - PADDING;
export const VIDEO_HEIGHT = VIDEO_WIDTH * (9 / 16);
