import { render, screen } from "@testing-library/react";
import PerformanceCardDetail from "../ui/PerformanceCardDetail.tsx";
import "@testing-library/jest-dom";
import performanceDetail from "../__mocks__/performanceDetailData.ts";

describe("공연 목록 상세 페이지 - 정보 렌더링", () => {
	it("공연 상세 정보를 화면에 표시한다.", () => {
		render(
			<PerformanceCardDetail
				performance={performanceDetail}
				onReserve={jest.fn()}
				onRatingChange={jest.fn()}
			/>
		);

		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(
			screen.getByAltText("j-hope Tour: HOPE ON THE STAGE [서울] 포스터 이미지")
		).toBeInTheDocument();
		expect(screen.getByText("액션")).toBeInTheDocument();
		expect(screen.getByText("대중음악")).toBeInTheDocument();
		expect(screen.getByText("올림픽공원")).toBeInTheDocument();
		expect(
			screen.getByText(
				"제이홉의 첫 단독 투어 서울 공연으로, 그의 솔로곡과 BTS 히트곡이 어우러진 무대다. 화려한 댄스와 에너지가 넘치는 무대 연출이 압권이다. 팬들과 소통하며 즐기는 시간으로, 깜짝 게스트가 등장하기도 한다. 무대 장치와 영상이 곡의 감정을 더욱 돋보이게 한다. 제이홉 특유의 밝음과 진심 어린 멘트가 마음을 울린다."
			)
		).toBeInTheDocument();
		expect(screen.getByText("140분")).toBeInTheDocument();
		expect(screen.getByText("20000원")).toBeInTheDocument();
		expect(screen.getByText("20250208 - 10:00")).toBeInTheDocument();
		expect(screen.getByText("20250208 - 14:00")).toBeInTheDocument();
		expect(screen.getByText("20250302 - 10:00")).toBeInTheDocument();
		expect(screen.getByText("20250302 - 14:00")).toBeInTheDocument();
		expect(screen.getByText("4.1점")).toBeInTheDocument();
	});
});
