import { render, screen, fireEvent } from "@testing-library/react";
import PerformanceCard from "../ui/PerformanceCard.tsx";
import performance from "../__mocks__/performanceData.ts";
import "@testing-library/jest-dom";

/* 공연 카드 렌더링 & 클릭 시, 상세 페이지로 navigate */
describe("공연 카드 목록 조회", () => {
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

	it("PerformanceCard를 여러 개 렌더링한다면, 각 카드가 정확히 표시된다.", () => {
		const performances = [
			performance,
			{ ...performance, id: 2, name: "2번째 공연" },
			{ ...performance, id: 3, name: "3번째 공연" },
		];

		performances.forEach((p) => {
			render(<PerformanceCard performance={p} onClick={() => {}} />);
		});
		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(screen.getByText("2번째 공연")).toBeInTheDocument();
		expect(screen.getByText("3번째 공연")).toBeInTheDocument();
	});

	it("카드 클릭 시, 상세 페이지 이동 콜백(onClick)이 호출된다.", () => {
		const handleClick = jest.fn();

		render(<PerformanceCard performance={performance} onClick={handleClick} />);

		const card = screen.getByTestId("performanceId");
		fireEvent.click(card);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(1);
	});

	it("performance prop이 undefined일 시, 렌더링하지 않는다.", () => {
		render(
			<PerformanceCard performance={undefined as any} onClick={() => {}} />
		);
		expect(screen.queryByTestId("performanceId")).not.toBeInTheDocument();
	});

	it("onClick이 전달되지 않아도, 클릭 시 에러 없이 작동한다.", () => {
		const cardRender = () =>
			render(
				<PerformanceCard performance={performance} onClick={undefined as any} />
			);
		expect(cardRender).not.toThrow();
	});
});
