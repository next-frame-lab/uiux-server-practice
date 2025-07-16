const performances = Array.from({ length: 10 }, (_, i) => ({
	id: i + 1,
	name: `공연 ${i + 1}`,
	image: "",
	type: "액션",
	genre: "뮤지컬",
	start_date: "20250101",
	end_date: "20250102",
	stadium: "올림픽공원",
	averageStar: 4.5,
}));

export default performances;
