import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TicketList from "../ui/TicketList";
import tickets from "../../data/tickets.json";

describe("TicketList 컴포넌트", () => {
	it("예매한 티켓 정보가 화면에 표시되어야 한다", () => {
		render(<TicketList />);

		const ticketItems = screen.getAllByTestId("ticket-item");
		expect(ticketItems.length).toBe(tickets.length);

		tickets.forEach((ticket) => {
			expect(
				screen.getByText(ticket.performances_title)
			).toBeInTheDocument();
			expect(
				screen.getByText(ticket.performances_stadium, { exact: false })
			).toBeInTheDocument();
		});
	});

	it("환불하기 버튼 클릭 시 해당 티켓이 제거된다", () => {
		render(<TicketList />);

		const initialTickets = screen.getAllByTestId("ticket-item");
		expect(initialTickets.length).toBeGreaterThan(0);

		const refundButtons = screen.getAllByTestId("refund-button");
		fireEvent.click(refundButtons[0]);

		const updatedTickets = screen.queryAllByTestId("ticket-item");
		expect(updatedTickets.length).toBe(initialTickets.length - 1);
	});

	it("예매 내역이 없는 경우 '예매 내역이 없습니다' 메시지가 표시된다", () => {
		jest.spyOn(React, "useState").mockImplementationOnce(() => [[], jest.fn()]);

		render(<TicketList />);
		expect(
			screen.getByTestId("empty-message")
		).toHaveTextContent("예매 내역이 없습니다.");
	});
});