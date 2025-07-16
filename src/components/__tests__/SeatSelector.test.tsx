import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import seats from "../../data/seats.json";
import SeatSelector from "../ui/SeatSelector.tsx";
import "@testing-library/jest-dom";

describe("SeatSelector 컴포넌트 호출", () => {
	it("Status - true인 좌석 초기 접근 시, 좌석 색상", () => {
		const handleChange = jest.fn();
		render(<SeatSelector seats={seats} onChange={handleChange} />);

		seats
			.filter((seat) => seat.status)
			.forEach((seat) => {
				const button = screen.getByTestId(`seat-${seat.seat_id}`);
				expect(button).toHaveClass("bg-white");
			});
	});

	it("status - false인 좌석은 선택되지 않음.", async () => {
		const handleChange = jest.fn();
		const disabledSeats = [{ ...seats[0], status: false }];

		render(<SeatSelector seats={disabledSeats} onChange={handleChange} />);

		const seat1 = screen.getByTestId("seat-1");
		await userEvent.click(seat1);

		expect(handleChange).not.toHaveBeenCalled();
		expect(seat1).toHaveClass("bg-gray-600");
	});

	it("좌석 클릭 시, 좌선 선택이 되며 onChange가 호출", async () => {
		const handleChange = jest.fn();
		render(<SeatSelector seats={seats} onChange={handleChange} />);

		const seat1 = screen.getByTestId("seat-1");
		await userEvent.click(seat1);

		expect(seat1).toHaveClass("bg-gray-500");
		expect(handleChange).toHaveBeenLastCalledWith([seats[0]], 20000);
	});

	it("선택한 좌석 재클릭 시, 선택 해제되면 onChange가 호출", async () => {
		const handleChange = jest.fn();
		render(<SeatSelector seats={seats} onChange={handleChange} />);

		const seat1 = screen.getByTestId("seat-1");

		await userEvent.click(seat1);
		await userEvent.click(seat1);

		expect(seat1).toHaveClass("bg-white");
		expect(handleChange).toHaveBeenLastCalledWith([], 0);
	});

	it("여러 좌석 선택 시, 총액과 배열 일치 판단", async () => {
		const handleChange = jest.fn();
		render(<SeatSelector seats={seats} onChange={handleChange} />);

		const seat1 = screen.getByTestId("seat-1");
		const seat2 = screen.getByTestId("seat-2");

		await userEvent.click(seat1);
		await userEvent.click(seat2);

		expect(handleChange).toHaveBeenCalledWith([seats[0], seats[1]], 40000);

		expect(seat1).toHaveClass("bg-gray-500");
		expect(seat2).toHaveClass("bg-gray-500");
	});
});
