import { fireEvent, render, screen } from "@testing-library/react";
import PerformanceCardDetail from "../../components/ui/PerformanceCardDetail.tsx";
import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import "@testing-library/jest-dom";

describe("공연 목록 상세 페이지 - 별점", () => {
	it("별 클릭 시, onRatingChange 호출 및 스타일 변경", () => {
		const handleRatingChange = jest.fn();

		render(
			<PerformanceCardDetail
				performance={performanceDetail}
				onReserve={jest.fn()}
				onRatingChange={handleRatingChange}
			/>
		);

		const stars = screen.getAllByText("★");

		fireEvent.click(stars[2]);
		expect(handleRatingChange).toHaveBeenCalledWith(1.5);

		expect(stars[2]).toHaveClass("gold");
	});

	it("초기 별점은 0으로 표시된다.", () => {
		render(
			<PerformanceCardDetail
				performance={performanceDetail}
				onReserve={jest.fn()}
				onRatingChange={jest.fn()}
			/>
		);
		expect(screen.getByText("0점")).toBeInTheDocument();
	});
});
