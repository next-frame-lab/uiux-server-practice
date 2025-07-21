import { useState } from "react";
import ticketsData from "../../data/tickets.json";

const TicketList = () => {
	const [tickets, setTickets] = useState(ticketsData);

	const handleRefund = (seatId: number) => {
		setTickets((prev) => prev.filter((ticket) => ticket.seat_id !== seatId));
	};

	if (tickets.length === 0) {
		return <p data-testid="empty-message">예매 내역이 없습니다.</p>;
	}

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">나의 티켓</h2>
			<ul className="space-y-4">
				{tickets.map((ticket) => (
					<li
						key={ticket.seat_id}
						className="border rounded-xl p-4 flex items-center justify-between shadow-sm"
						data-testid="ticket-item"
					>
						<div>
							<p className="font-semibold text-lg">{ticket.performances_title}</p>
							<p className="text-sm text-gray-600">
								{formatDate(ticket.performances_start_date)}{" "}
								{ticket.performances_start_time}
							</p>
							<p className="text-sm text-gray-600">
								{ticket.performances_stadium}, {ticket.performances_area}
							</p>
						</div>
						<button
							onClick={() => handleRefund(ticket.seat_id)}
							className="bg-[#dcebf7] text-black font-medium px-6 py-2 rounded-full w-full max-w-xs text-center"
							data-testid="refund-button"
						>
							환불하기
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const formatDate = (yyyymmdd: number) => {
	const s = yyyymmdd.toString();
	return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
};

export default TicketList;