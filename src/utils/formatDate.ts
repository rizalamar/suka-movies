export const formatDateTime = (dateTimeStr: string) => {
	if (!dateTimeStr) return { date: "Unknown date", time: "" };

	const date = new Date(dateTimeStr);
	if (isNaN(date.getTime())) return { date: "Unknown date", time: "" };

	const formattedDate = date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	const formattedTime = date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	return { date: formattedDate, time: formattedTime };
};
