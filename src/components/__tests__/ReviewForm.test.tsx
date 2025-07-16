// src/components/__tests__/ReviewForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ReviewForm from "../../components/ui/ReviewForm";

describe("ReviewForm", () => {
	it("로그인된 사용자는 리뷰 작성 후 제출 시 콜백이 호출된다", () => {
		const handleSubmit = jest.fn();
		const handleRequireLogin = jest.fn();

		render(
			<ReviewForm
				isLoggedIn={true}
				onSubmit={handleSubmit}
				onRequireLogin={handleRequireLogin}
			/>
		);

		fireEvent.change(screen.getByPlaceholderText("후기를 입력해주세요"), {
			target: { value: "정말 감동적인 공연이었어요!" },
		});

		fireEvent.click(screen.getByText("리뷰 작성"));

		expect(handleSubmit).toHaveBeenCalledWith("정말 감동적인 공연이었어요!");
		expect(handleRequireLogin).not.toHaveBeenCalled();
	});

	it("로그인되지 않은 사용자는 로그인 요구 콜백이 호출된다", () => {
		const handleSubmit = jest.fn();
		const handleRequireLogin = jest.fn();

		render(
			<ReviewForm
				isLoggedIn={false}
				onSubmit={handleSubmit}
				onRequireLogin={handleRequireLogin}
			/>
		);

		fireEvent.change(screen.getByPlaceholderText("후기를 입력해주세요"), {
			target: { value: "멋진 무대였습니다!" },
		});

		fireEvent.click(screen.getByText("리뷰 작성"));

		expect(handleSubmit).not.toHaveBeenCalled();
		expect(handleRequireLogin).toHaveBeenCalled();
	});
});