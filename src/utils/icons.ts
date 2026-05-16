import * as LucideIcons from "lucide-react-native";

export const getGenreIcon = (name: string) => {
	const genreName = name.toLowerCase();

	if (genreName.includes("action")) return LucideIcons.Zap;
	if (genreName.includes("adventure")) return LucideIcons.Compass;
	if (genreName.includes("animation")) return LucideIcons.Ghost;
	if (genreName.includes("comedy")) return LucideIcons.Laugh;
	if (genreName.includes("crime")) return LucideIcons.Columns4;
	if (genreName.includes("documentary")) return LucideIcons.FileText;
	if (genreName.includes("drama")) return LucideIcons.Drama;
	if (genreName.includes("family")) return LucideIcons.Users;
	if (genreName.includes("fantasy")) return LucideIcons.Sparkles;
	if (genreName.includes("history")) return LucideIcons.Book;
	if (genreName.includes("horror")) return LucideIcons.Skull;
	if (genreName.includes("music")) return LucideIcons.Music;
	if (genreName.includes("mystery")) return LucideIcons.HatGlasses;
	if (genreName.includes("romance")) return LucideIcons.Heart;
	if (genreName.includes("science fiction")) return LucideIcons.Rocket;
	if (genreName.includes("thriller")) return LucideIcons.AlertTriangle;
	if (genreName.includes("war")) return LucideIcons.Sword;
	if (genreName.includes("western")) return LucideIcons.Signpost;

	return LucideIcons.Clapperboard;
};
