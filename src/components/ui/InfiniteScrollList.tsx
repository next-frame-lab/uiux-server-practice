import { useEffect, useRef } from "react";
import PerformanceCard, { performanceData } from "./PerformanceCard.tsx";

interface InfiniteScrollListProps {
	items: performanceData[];
	fetchNext: () => void; // 다음 10개를 로드하는 함수
	hasMore: boolean; // 더 불러올 데이터가 있는지에 대한 여부
	onClick: (id: number) => void;
}

export default function InfiniteScrollList({
	items,
	fetchNext,
	hasMore,
	onClick,
}: InfiniteScrollListProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!bottomRef.current || !hasMore) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNext();
				}
			},
			{ threshold: 1 }
		);

		observer.observe(bottomRef.current);

		return () => observer.disconnect();
	}, [bottomRef, hasMore, fetchNext]);

	return (
		<div>
			{items.map((performance) => (
				<PerformanceCard
					key={performance.id}
					performance={performance}
					onClick={onClick}
				/>
			))}
			{hasMore && <div ref={bottomRef} data-testid="scroll-loader" />}
		</div>
	);
}
