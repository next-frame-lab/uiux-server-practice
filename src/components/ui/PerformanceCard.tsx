export type performanceData = {
	id: number;
	name: string;
	image: string;
	type: string;
	genre: string;
	start_date: string;
	end_date: string;
	stadium: string;
	averageStar: number;
};

export interface performanceCardProps {
	performance: performanceData;
	onClick: (id: number) => void;
}

export default function PerformanceCard({
	performance,
	onClick,
}: performanceCardProps) {
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
			<p>{performance.stadium}</p>
			<p>{performance.averageStar}</p>
			<p>
				{performance.start_date} ~ {performance.end_date}
			</p>
		</button>
	);
}
