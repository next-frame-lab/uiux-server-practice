import { render, screen } from "@testing-library/react";
import { Profile } from "../ui/Profile";
import users from "../../data/users.json";

const mockUser = {
	name: users[0].name,
	email: users[0].email,
	image: users[0].image,
};

describe("Profile 컴포넌트", () => {
	it("사용자 이름과 이메일이 화면에 표시되어야 한다", () => {
		render(<Profile user={mockUser} />);
		expect(screen.getByText(mockUser.name)).toBeInTheDocument();
		expect(screen.getByText(mockUser.email)).toBeInTheDocument();
	});

	it("사용자 이미지가 렌더링되어야 한다", () => {
		render(<Profile user={mockUser} />);
		const img = screen.getByAltText("사용자 이미지") as HTMLImageElement;
		expect(img).toBeInTheDocument();
		expect(img.src).toContain(mockUser.image);
	});

	it("사용자 정보가 없을 경우 fallback 메시지를 표시한다", () => {
		render(<Profile user={null} />);
		expect(
			screen.getByText("사용자 정보를 불러올 수 없습니다")
		).toBeInTheDocument();
	});
});