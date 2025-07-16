import { Fragment, useState } from "react";

type Seat = {
	seat_id: number;
	performances_start_date: number;
	performances_start_time: string;
	performances_price: number;
	status: boolean;
};

interface SeatSelectorProps {
	seats: Seat[];
	onChange: (selectedSeats: Seat[], totalPrice: number) => void;
}

export default function SeatSelector({ seats, onChange }: SeatSelectorProps) {
	const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

	const toggleSeat = (seat: Seat) => {
		if (!seat.status) return;

		const alreadySelected = selectedSeats.some(
			(s) => s.seat_id === seat.seat_id
		);

		const newSelectedSeats = alreadySelected
			? selectedSeats.filter((s) => s.seat_id !== seat.seat_id)
			: [...selectedSeats, seat];

		setSelectedSeats(newSelectedSeats);

		const totalPrice = newSelectedSeats.reduce(
			(acc, s) => acc + s.performances_price,
			0
		);

		onChange(newSelectedSeats, totalPrice);
	};

	const seatButtons = seats.map((seat) => {
		let buttonClass = "bg-white";

		if (!seat.status) {
			buttonClass = "bg-gray-600";
		} else if (selectedSeats.some((s) => s.seat_id === seat.seat_id)) {
			buttonClass = "bg-gray-500";
		}
		return (
			<Fragment key={seat.seat_id}>
				<button
					type="button"
					data-testid={`seat-${seat.seat_id}`}
					onClick={() => toggleSeat(seat)}
					className={buttonClass}>
					좌석
				</button>
				<p>{seat.performances_price}</p>
			</Fragment>
		);
	});

	return <div>{seatButtons}</div>;
}
