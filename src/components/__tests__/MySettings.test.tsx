// src/components/__tests__/MySettings.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import MySettings from "../ui/MySettings";

describe("MySettings 컴포넌트", () => {
	it("Settings 탭 클릭 시 알림 설정 UI가 표시된다", () => {
		render(<MySettings />);
		expect(screen.getByText("알림 설정")).toBeInTheDocument();
	});

	it("알림 스위치를 클릭하면 상태가 토글된다", () => {
		render(<MySettings />);
		const toggle = screen.getByRole("checkbox");
		expect(toggle).not.toBeChecked();

		fireEvent.click(toggle);
		expect(toggle).toBeChecked();

		fireEvent.click(toggle);
		expect(toggle).not.toBeChecked();
	});

	it("알림 설정 변경 시 서버에 요청이 전송된다", () => {
		const mockFn = jest.fn();
		render(<MySettings onChange={mockFn} />);

		const toggle = screen.getByRole("checkbox");
		fireEvent.click(toggle);

		expect(mockFn).toHaveBeenCalledWith(true);
	});
});
