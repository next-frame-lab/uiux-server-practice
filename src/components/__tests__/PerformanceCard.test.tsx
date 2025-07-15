import { render, screen, fireEvent } from "@testing-library/react";
import PerformanceCard from "../ui/PerformanceCard.tsx";
import "@testing-library/jest-dom";

/* 공연 카드 렌더링 & 클릭 시, 상세 페이지로 navigate */
describe("공연 카드 목록 조회", () => {
	const performance = {
		id: 1,
		name: "j-hope Tour: HOPE ON THE STAGE [서울]",
		image: "/image/Performance_1.gif",
		type: "액션",
		genre: "대중음악",
		start_date: "20250228",
		end_date: "20250302",
		stadium: "올림픽공원",
		averageStar: 4.1,
	};

	it("공연 카드에 공연 이름, 공연 장소, 공연 시작/종료 날짜, 공연 평균 별점이 표시된다.", () => {
		render(<PerformanceCard performance={performance} onClick={() => {}} />);

		expect(
			screen.getByAltText("j-hope Tour: HOPE ON THE STAGE [서울] 포스터 이미지")
		).toBeInTheDocument();
		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(screen.getByText("20250228 ~ 20250302")).toBeInTheDocument();
		expect(screen.getByText("올림픽공원")).toBeInTheDocument();
		expect(screen.getByText("4.1")).toBeInTheDocument();
	});

	it("카드 클릭 시, 상세 페이지 이동 콜백(onClick)이 호출된다.", () => {
		const handleClick = jest.fn();

		render(<PerformanceCard performance={performance} onClick={handleClick} />);

		const card = screen.getByTestId("performanceId");
		fireEvent.click(card);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(1);
	});
});
