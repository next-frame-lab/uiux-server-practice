import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comments from "../ui/Comments";

const mockReviews = [
	{
		id: "c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1234",
		writerName: "뮤덕이",
		writerProfileImage: "https://cdn.example.com/profiles/user123.jpg",
		content: "정말 감동적인 공연이었어요. 무대 연출도 최고!",
		likeCount: 12,
		createdAt: "2025-07-01 14:32:00",
	},
];

describe("Comments 도메인", () => {
	beforeEach(() => {
		render(
			<Comments isLoggedIn={true} userId="user123" reviews={mockReviews} />
		);
	});

	describe("리뷰 조회", () => {
		it("공연 상세 페이지 진입 시 리뷰 데이터를 불러온다", () => {
			expect(
				screen.getByText("정말 감동적인 공연이었어요. 무대 연출도 최고!")
			).toBeInTheDocument();
		});

		it("작성자 이름, 날짜, 좋아요 수와 함께 리뷰가 렌더링된다", () => {
			expect(screen.getByText("뮤덕이")).toBeInTheDocument();
			expect(screen.getByText("2025-07-01 14:32:00")).toBeInTheDocument();
			expect(screen.getByText("좋아요 12")).toBeInTheDocument();
		});

		it("좋아요 수가 15 이상이면 BEST Review 뱃지가 표시된다", () => {
			const updatedReviews = [{ ...mockReviews[0], likeCount: 17 }];
			render(
				<Comments isLoggedIn={true} userId="user123" reviews={updatedReviews} />
			);
			expect(screen.getByText("BEST")).toBeInTheDocument();
		});
	});

	describe("좋아요(따봉) 동작", () => {
		it("좋아요 버튼 클릭 시 좋아요 수가 증가한다", async () => {
			const likeButton = screen.getAllByRole("button", { name: "좋아요" })[0];
			userEvent.click(likeButton);
			await waitFor(() => {
				expect(screen.getByText("좋아요 13")).toBeInTheDocument();
			});
		});
	});

	describe("리뷰 없음 상태", () => {
		it("리뷰가 없을 경우 빈 상태 메시지를 표시한다", () => {
			render(<Comments isLoggedIn={true} userId="user123" reviews={[]} />);
			expect(screen.getByText("리뷰가 없습니다")).toBeInTheDocument();
		});
	});

	describe("리뷰 작성", () => {
		it("로그인한 사용자는 작성 폼을 볼 수 있다", () => {
			expect(
				screen.getByPlaceholderText("리뷰를 입력하세요")
			).toBeInTheDocument();
		});

		it("리뷰 작성 시 내용이 없거나 빈 값이면 등록 버튼이 비활성화된다", () => {
			expect(screen.getByRole("button", { name: "등록" })).toBeDisabled();
		});

		it("내용 입력 시 등록 버튼이 활성화되고 등록 후 목록에 반영된다", async () => {
			const input = screen.getByPlaceholderText("리뷰를 입력하세요");
			const button = screen.getByRole("button", { name: "등록" });

			await userEvent.type(input, "너무 재밌었어요!");
			expect(button).toBeEnabled();

			userEvent.click(button);
			await waitFor(() => {
				expect(screen.getByText("너무 재밌었어요!")).toBeInTheDocument();
			});
		});
	});

	describe("리뷰 수정/삭제", () => {
		it("본인의 리뷰에는 수정 및 삭제 버튼이 보인다", () => {
			expect(screen.getByRole("button", { name: "수정" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
		});

		it("리뷰 수정 시 기존 내용이 폼에 미리 입력된다", async () => {
			userEvent.click(screen.getByRole("button", { name: "수정" }));
			await waitFor(() => {
				expect(
					screen.getByDisplayValue(
						"정말 감동적인 공연이었어요. 무대 연출도 최고!"
					)
				).toBeInTheDocument();
			});
		});

		it("리뷰 수정 후 저장하면 내용이 반영된다", async () => {
			userEvent.click(screen.getByRole("button", { name: "수정" }));

			const input = await screen.findByDisplayValue(
				"정말 감동적인 공연이었어요. 무대 연출도 최고!"
			);
			fireEvent.change(input, {
				target: { value: "수정된 내용입니다." },
			});

			userEvent.click(screen.getByRole("button", { name: "저장" }));

			await waitFor(() => {
				expect(screen.getByText("수정된 내용입니다.")).toBeInTheDocument();
			});
		});

		it("삭제 버튼 클릭 시 확인창 이후 리뷰가 삭제된다", async () => {
			window.confirm = jest.fn(() => true);
			userEvent.click(screen.getByRole("button", { name: "삭제" }));

			await waitFor(() => {
				expect(
					screen.queryByText("정말 감동적인 공연이었어요. 무대 연출도 최고!")
				).not.toBeInTheDocument();
			});
		});
	});
});
