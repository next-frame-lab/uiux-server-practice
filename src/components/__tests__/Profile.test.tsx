import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../ui/Profile";

describe("Profile 컴포넌트", () => {
	it("마이페이지 진입 시 Profile 탭이 기본 선택된다", () => {
		render(<Profile />);
		expect(
			screen.getByRole("heading", { name: "Profile" })
		).toBeInTheDocument();
	});

	it("사용자 정보가 올바르게 출력된다 (이름, 이메일, 이미지)", async () => {
		render(<Profile />);
		await waitFor(() => {
			expect(screen.getByText("이름: 오준택")).toBeInTheDocument();
			expect(
				screen.getByText("이메일: handsomegay@naver.com")
			).toBeInTheDocument();
			expect(screen.getByAltText("사용자 프로필 이미지")).toBeInTheDocument();
		});
	});

	it("서버에서 사용자 정보를 받아오지 못하면 에러 메시지를 표시한다", async () => {
		render(<Profile shouldFail={true} />);
		await waitFor(() => {
			expect(
				screen.getByText("사용자 정보를 불러오는 데 실패했습니다.")
			).toBeInTheDocument();
		});
	});
});
