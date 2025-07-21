import { useState } from "react";
import { PerformanceDetailData } from "../__mocks__/performanceDetailData.ts";

interface Props {
	performance: PerformanceDetailData;
}

export default function PerformanceInfo({ performance }: Props) {
	const [selectedSchedule, setSelectedSchedule] = useState<string>("");

	return (
		<div>
			<h1>{performance.name}</h1>
			<p>
				{performance.type} | {performance.genre}
			</p>
			<p>{performance.stadium.name}</p>
			<p>{performance.stadium.address}</p>
			<p>진행 시간: {performance.runningTime}분</p>
			<p>
				관람 연령가: {performance.adultOnly ? "19세 이용가" : "전체 이용가"}
			</p>
			<p>평균 별점: {performance.averageStar}점</p>
			<select
				value={selectedSchedule}
				onChange={(e) => setSelectedSchedule(e.target.value)}>
				{performance.scheduleList.map((s) => (
					<option key={s.id} value={`${s.date} - ${s.time}`}>
						{s.date} - {s.time}
					</option>
				))}
			</select>
			<ul>
				{performance.seatPrices.map((seat) => (
					<li key={seat.grade}>
						{seat.grade} / {seat.price}
					</li>
				))}
			</ul>
		</div>
	);
}
