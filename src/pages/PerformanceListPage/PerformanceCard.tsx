import { PerformanceListItem } from "../__mocks__/performanceData.ts";

export interface PerformanceCardProps {
	performance: PerformanceListItem;
	onClick: (id: number) => void;
}

export default function PerformanceCard({
	performance,
	onClick,
}: PerformanceCardProps) {
	if (!performance) {
		return null;
	}

	return (
		<button
			type="button"
			data-testid="performanceId"
			onClick={() => onClick(performance.id)}>
			<img src={performance.image} alt={`${performance.name} 포스터 이미지`} />
			<h2>{performance.name}</h2>
			<p>{performance.stadiumName}</p>
			<p>{performance.averageStar}</p>
			<p>
				{performance.startDate} ~ {performance.endDate}
			</p>
		</button>
	);
}
