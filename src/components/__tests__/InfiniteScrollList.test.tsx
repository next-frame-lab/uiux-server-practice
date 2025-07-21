/* 무한 스크롤 append, 중복 제거 */
import { render, screen } from "@testing-library/react";
import InfiniteScrollList from "../ui/InfiniteScrollList.tsx";
import "@testing-library/jest-dom";
import performanceData from "../../pages/__mocks__/performanceData.ts";

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
	it("초기 2개 공연 카드가 렌더링된다.", () => {
		render(
			<InfiniteScrollList
				items={performanceData.performanceList}
				fetchNext={() => {}}
				hasMore
				onClick={() => {}}
			/>
		);

		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(screen.getByText("오페라 유령")).toBeInTheDocument();
	});

	it("hasMore가 false라면, 하단 로더가 보이지 않음.", () => {
		render(
			<InfiniteScrollList
				items={performanceData.performanceList}
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
				items={performanceData.performanceList}
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

	it("IntersectionObserver 작동 중, isIntersecting이 false일 경우, fetchNext 호출 x", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScrollList
				items={performanceData.performanceList}
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
