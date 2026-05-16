const AVATAR_COLORS = [
	{ bg: "#0C447C", text: "#B5D4F4" },
	{ bg: "#3B6D11", text: "#C0DD97" },
	{ bg: "#712B13", text: "#F5C4B3" },
	{ bg: "#533489", text: "#CECBF6" }, // fallback
];

export const getAvatarColor = (name: string) => {
	const index = name.charCodeAt(0) % AVATAR_COLORS.length;
	return AVATAR_COLORS[index];
};
