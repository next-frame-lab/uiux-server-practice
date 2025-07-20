/* 공연 ID를 통해 공연의 상세 정보를 조회하는 테스트 목업 데이터입니다. */
export type stadium = {
	name: string;
	address: string;
};

export type scheduleList = {
	id: number;
	date: string;
	time: string;
};

export type seatPrices = {
	grade: string;
	price: number;
};

export interface PerformanceDetailData {
	id: number;
	image: string;
	name: string;
	type: string;
	genre: string;
	averageStar: number;
	runningTime: number;
	description: string;
	adultOnly: boolean;
	stadium: stadium;
	scheduleList: scheduleList[];
	seatPrices: seatPrices[];
}

const performanceDetail: PerformanceDetailData = {
	id: 1,
	image: "https://example.com/",
	name: "오페라 유령",
	type: "로맨스",
	genre: "오페라",
	averageStar: 4.6,
	runningTime: 130,
	description:
		"전설적인 오페라의 유령이 다시 돌아옵니다. 아름다운 무대와 감동적인 음악을 함께 즐겨보세요.",
	adultOnly: true,
	stadium: {
		name: "부산문화회관",
		address: "부산광역시 남구 유엔로 123",
	},
	scheduleList: [
		{
			id: 1,
			date: "2025-09-10",
			time: "10:00",
		},
		{
			id: 2,
			date: "2025-09-10",
			time: "19:00",
		},
		{
			id: 3,
			date: "2025-09-11",
			time: "10:00",
		},
		{
			id: 4,
			date: "2025-09-11",
			time: "19:00",
		},
	],
	seatPrices: [
		{
			grade: "A",
			price: 120000,
		},
		{
			grade: "B",
			price: 100000,
		},
		{
			grade: "C",
			price: 80000,
		},
	],
};

export default performanceDetail;
