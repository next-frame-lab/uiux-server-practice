import { render, screen } from "@testing-library/react";
import ReviewList from "../../components/ui/ReviewList";
import comments from "../../data/comments.json";

describe("ReviewList 컴포넌트", () => {
	it("모든 리뷰가 정상 렌더링 되어야 한다", () => {
		render(<ReviewList />);
		const items = screen.getAllByTestId("review-item");
		expect(items.length).toBe(comments.length);
	});

	it("리뷰 내용이 정확히 표시되어야 한다", () => {
		render(<ReviewList />);
		expect(
			screen.getByText("처음 본 공연인데 정말 감동적이었어요!")
		).toBeInTheDocument();
		expect(
			screen.getByText("배우들의 연기가 정말 대단했습니다. 마지막 장면에서 눈물이 났네요.")
		).toBeInTheDocument();
	});

	it("좋아요 수가 20 이상이면 BEST Review 뱃지가 표시되어야 한다", () => {
		render(<ReviewList />);
		const badges = screen.getAllByTestId("best-badge");
		const bestCount = comments.filter((c) => c.thumb_count >= 20).length;
		expect(badges.length).toBe(bestCount);
	});
});