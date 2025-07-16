import { fireEvent, render, screen } from "@testing-library/react";
import ReviewVoteButtons from "../../components/ui/ReviewVoteButtons";

describe("ReviewVoteButtons", () => {
	it("좋아요 클릭 시 숫자 증가", () => {
		render(
			<ReviewVoteButtons
				initialLikes={10}
				initialDislikes={5}
				isLoggedIn={true}
				onRequireLogin={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("👍 10"));
		expect(screen.getByText("👍 11")).toBeInTheDocument();
	});

	it("싫어요 클릭 시 숫자 증가", () => {
		render(
			<ReviewVoteButtons
				initialLikes={2}
				initialDislikes={3}
				isLoggedIn={true}
				onRequireLogin={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("👎 3"));
		expect(screen.getByText("👎 4")).toBeInTheDocument();
	});

	it("좋아요와 싫어요는 동시에 활성화되지 않는다", () => {
		render(
			<ReviewVoteButtons
				initialLikes={0}
				initialDislikes={0}
				isLoggedIn={true}
				onRequireLogin={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("👍 0")); // 좋아요: 1
		fireEvent.click(screen.getByText("👎 0")); // 싫어요: 1, 좋아요: 0

		expect(screen.getByText("👎 1")).toBeInTheDocument();
		expect(screen.getByText("👍 0")).toBeInTheDocument();
	});

	it("비로그인 시 클릭하면 로그인 콜백이 호출된다", () => {
		const mockLogin = jest.fn();

		render(
			<ReviewVoteButtons
				initialLikes={7}
				initialDislikes={3}
				isLoggedIn={false}
				onRequireLogin={mockLogin}
			/>
		);

		fireEvent.click(screen.getByText("👍 7"));
		fireEvent.click(screen.getByText("👎 3"));

		expect(mockLogin).toHaveBeenCalledTimes(2);
	});
});
