import { useState } from "react";

export type PerformanceCardDetailData = {
	id: number;
	name: string;
	image: string;
	type: string;
	genre: string;
	start_date: string;
	end_date: string;
	stadium: string;
	description: string;
	duration: number;
	price: number;
	dates: string[];
	times: string[];
	averageStar: number;
};

interface PerformanceCardDetailProps {
	performance: PerformanceCardDetailData;
	onReserve: (date: string, time: string) => void;
	onRatingChange: (rating: number) => void;
}

const START_VALUES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function PerformanceCardDetail({
	performance,
	onReserve,
	onRatingChange,
}: PerformanceCardDetailProps) {
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [rating, setRating] = useState<number>(0);

	const combinedOptions = performance.dates.flatMap((date) =>
		performance.times.map((time) => `${date} - ${time}`)
	);
	const handleReserve = () => {
		if (!selectedDay) return;

		const [date, time] = selectedDay.split(" - ");
		onReserve(date, time);
	};

	const handleRating = (value: number) => {
		setRating(value);
		onRatingChange(value);
	};

	return (
		<>
			{/* 좌측 이미지 sticky */}
			<div>
				<img
					src={performance.image}
					alt={`${performance.name} 포스터 이미지`}
				/>
			</div>

			{/* 공연 상세 정보 */}
			<div key={performance.id}>
				<p>{performance.name}</p>
				<p>{performance.type}</p>
				<p>{performance.genre}</p>
				<p>{performance.stadium}</p>
				<p>
					{performance.start_date} ~ {performance.end_date}
				</p>
				<p>{performance.duration}분</p>
				<p>{performance.price}원</p>
				<p>{performance.description}</p>
				<p>{performance.averageStar}점</p>

				{/* 별점 */}
				<div>
					{START_VALUES.map((value) => (
						<button
							type="button"
							key={value}
							onClick={() => handleRating(value)}
							className={`${rating >= value ? "gold" : "bg-gray-500"}`}>
							★
						</button>
					))}
					<span>{rating}점</span>
				</div>

				{/* 날짜, 시간 드롭 다운 */}
				<select
					value={selectedDay}
					onChange={(e) => setSelectedDay(e.target.value)}>
					<option value="">날짜 & 시간 선택</option>
					{combinedOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>

				{/* 예매하기 버튼 */}
				<button type="button" disabled={!selectedDay} onClick={handleReserve}>
					예매하기
				</button>
			</div>
		</>
	);
}
