import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "../ui/FilterBar.tsx";

describe("필터바에서 유형(Type) 선택", () => {
	it("유형(type) 버튼 클릭 시, onTypeChange 콜백이 호출", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		const typeButton = screen.getByRole("button", { name: "액션" });
		fireEvent.click(typeButton);

		expect(onTypeChange).toHaveBeenCalledWith("액션");
		expect(onGenreChange).not.toHaveBeenCalled();

		fireEvent.click(typeButton);
		expect(onTypeChange).toHaveBeenCalledWith(null);
	});

	it("초기 렌더링 시, 어떤 유형도 선택하지 않음", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		expect(onTypeChange).not.toHaveBeenCalled();
	});

	it("다른 유형을 클릭하면 이전 선택 유형을 해제 후, 새로운 값으로 onTypeChange 호출", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		const actionButton = screen.getByRole("button", { name: "액션" });
		const romanceButton = screen.getByRole("button", { name: "로맨스" });

		fireEvent.click(actionButton);
		expect(onTypeChange).toHaveBeenCalledWith("액션");

		fireEvent.click(romanceButton);
		expect(onTypeChange).toHaveBeenCalledWith("로맨스");

		fireEvent.click(romanceButton);
		expect(onTypeChange).toHaveBeenCalledWith(null);
	});
});
