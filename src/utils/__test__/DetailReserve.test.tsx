import { fireEvent, render, screen } from "@testing-library/react";
import PerformanceCardDetail from "../../components/ui/PerformanceCardDetail.tsx";
import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import "@testing-library/jest-dom";

describe("공연 목록 상세 페이지 - 날짜 시간 선택", () => {
	it("날짜 & 시간 선택 시, 예매 버튼 활성화, 클릭 시 onReserve 호출", () => {
		const handleReserve = jest.fn();

		render(
			<PerformanceCardDetail
				performance={performanceDetail}
				onReserve={handleReserve}
				onRatingChange={jest.fn()}
			/>
		);

		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "20250208 - 10:00" } });

		const reserveButton = screen.getByRole("button", { name: "예매하기" });
		expect(reserveButton).not.toBeDisabled();

		fireEvent.click(reserveButton);

		expect(handleReserve).toHaveBeenCalledWith("20250208", "10:00");
	});
});
