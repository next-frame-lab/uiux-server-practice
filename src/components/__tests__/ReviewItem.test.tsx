import { fireEvent, render, screen } from "@testing-library/react";
import ReviewItem from "../../components/ui/ReviewItem";

describe("ReviewItem", () => {
	const mockReview = {
		id: 1,
		userId: 1,
		name: "오준택",
		content: "정말 멋진 공연이었어요!",
		thumb_count: 12,
		dislike_count: 3,
	};

	const setup = (props = {}) => {
		const defaultProps = {
			review: mockReview,
			currentUserId: 1,
			isLoggedIn: true,
			onDelete: jest.fn(),
			onRequireLogin: jest.fn(),
		};

		return render(<ReviewItem {...defaultProps} {...props} />);
	};

	it("리뷰 정보가 정상적으로 렌더링된다", () => {
		setup();

		expect(screen.getByText("오준택")).toBeInTheDocument();
		expect(screen.getByText("정말 멋진 공연이었어요!")).toBeInTheDocument();
		expect(screen.getByText("👍 12")).toBeInTheDocument();
		expect(screen.getByText("👎 3")).toBeInTheDocument();
	});

	it("삭제 버튼이 본인 리뷰일 때 표시된다", () => {
		setup({ currentUserId: 1 });
		expect(screen.getByText("삭제")).toBeInTheDocument();
	});

	it("삭제 버튼 클릭 시 onDelete가 호출된다", () => {
		const handleDelete = jest.fn();
		setup({ currentUserId: 1, onDelete: handleDelete });

		fireEvent.click(screen.getByText("삭제"));
		expect(handleDelete).toHaveBeenCalledWith(1);
	});

	it("비로그인 상태에서 좋아요 클릭 시 로그인 유도 콜백 호출", () => {
		const handleLogin = jest.fn();
		setup({ isLoggedIn: false, onRequireLogin: handleLogin });

		fireEvent.click(screen.getByText("👍 12"));
		expect(handleLogin).toHaveBeenCalled();
	});

	it("비로그인 상태에서 싫어요 클릭 시 로그인 유도 콜백 호출", () => {
		const handleLogin = jest.fn();
		setup({ isLoggedIn: false, onRequireLogin: handleLogin });

		fireEvent.click(screen.getByText("👎 3"));
		expect(handleLogin).toHaveBeenCalled();
	});

	it("본인 리뷰가 아니면 삭제 버튼이 표시되지 않는다", () => {
		setup({ currentUserId: 99 }); // 다른 사용자
		expect(screen.queryByText("삭제")).not.toBeInTheDocument();
	});

	it("좋아요 수가 15 이상이면 BEST Review 태그가 표시된다", () => {
		const bestReview = {
			...mockReview,
			thumb_count: 15,
		};

		render(
			<ReviewItem
				review={bestReview}
				currentUserId={1}
				isLoggedIn={true}
				onDelete={jest.fn()}
				onRequireLogin={jest.fn()}
			/>
		);

		expect(screen.getByText("BEST Review")).toBeInTheDocument();
	});

	it("좋아요 수가 15 미만이면 BEST Review 태그가 표시되지 않는다", () => {
		const normalReview = {
			...mockReview,
			thumb_count: 14,
		};

		render(
			<ReviewItem
				review={normalReview}
				currentUserId={1}
				isLoggedIn={true}
				onDelete={jest.fn()}
				onRequireLogin={jest.fn()}
			/>
		);

		expect(screen.queryByText("BEST Review")).not.toBeInTheDocument();
	});
});
