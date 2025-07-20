/* 공연 목록을 조회 및 검색하기 위한 테스트 목업 데이터입니다. */
export interface PerformanceListItem {
	id: number;
	image: string;
	name: string;
	type: string;
	genre: string;
	stadiumName: string;
	startDate: string;
	endDate: string;
	averageStar: number;
	adultOnly: boolean;
}

export interface Pagination {
	page: number;
	size: number;
	totalItems: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface PerformanceData {
	performanceList: PerformanceListItem[];
	pagination: Pagination;
}

const performanceData: PerformanceData = {
	performanceList: [
		{
			id: 1,
			name: "j-hope Tour: HOPE ON THE STAGE [서울]",
			image: "/image/Performance_1.gif",
			type: "액션",
			genre: "대중음악",
			startDate: "20250228",
			endDate: "20250302",
			stadiumName: "올림픽공원",
			averageStar: 4.1,
			adultOnly: false,
		},
		{
			id: 2,
			name: "오페라 유령",
			image: "/image/Performance_2.gif",
			type: "호러",
			genre: "뮤지컬",
			startDate: "20250228",
			endDate: "20250302",
			stadiumName: "올림픽공원",
			averageStar: 4.3,
			adultOnly: true,
		},
	],
	pagination: {
		page: 0,
		size: 32,
		totalItems: 88,
		totalPages: 3,
		hasNext: true,
		hasPrevious: true,
	},
};

export default performanceData;
