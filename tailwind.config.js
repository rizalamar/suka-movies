/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./package.json"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#E11D48",
				background: "#0f172a",
				surface: "#1e293b",
				accent: "#f59e0b",
				textPrimary: "#f8fafc",
				textSecondary: "#94a3b8",
			},
		},
	},
	plugins: [],
};
