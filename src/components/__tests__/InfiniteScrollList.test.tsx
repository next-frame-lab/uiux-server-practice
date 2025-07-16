/* 무한 스크롤 append, 중복 제거 */
import { render, screen } from "@testing-library/react";
import InfiniteScrollList from "../ui/InfiniteScrollList.tsx";
import performances from "../__mocks__/performancesData.ts";
import "@testing-library/jest-dom";

beforeEach(() => {
	window.IntersectionObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
		takeRecords: jest.fn(),
		root: null,
		rootMargin: "",
		thresholds: [],
	}));
});

describe("인피니티 스크롤 리스트 컴포넌트 호출", () => {
	it("초기 10개 공연 카드가 렌더링된다.", () => {
		render(
			<InfiniteScrollList
				items={performances}
				fetchNext={() => {}}
				hasMore
				onClick={() => {}}
			/>
		);

		expect(screen.getByText("공연 1")).toBeInTheDocument();
		expect(screen.getByText("공연 10")).toBeInTheDocument();
	});

	it("hasMore가 false라면, 하단 로더가 보이지 않음.", () => {
		render(
			<InfiniteScrollList
				items={performances}
				fetchNext={() => {}}
				hasMore={false}
				onClick={() => {}}
			/>
		);

		expect(screen.queryByTestId("scroll-loader")).not.toBeInTheDocument();
	});

	it("IntersectionObserver 작동 시, fetchNext 호출", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScrollList
				items={performances}
				fetchNext={fetchNext}
				hasMore
				onClick={() => {}}
			/>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: true }]);

		expect(fetchNext).toHaveBeenCalled();
	});

	it("IntersectionObserver 작동 중, isIntersecting이 false일 경우, fetchNext 호출x", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScrollList
				items={performances}
				fetchNext={fetchNext}
				hasMore
				onClick={() => {}}
			/>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: false }]);

		expect(fetchNext).not.toHaveBeenCalled();
	});
});
