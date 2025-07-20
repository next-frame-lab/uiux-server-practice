/* 필터 UI (유형, 카테고리) */
import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "../ui/FilterBar.tsx";

describe("필터바에서 유형(Type) 또는 장르(Genre) 선택", () => {
	it("초기 렌더링 시, 어떤 유형/장르도 선택하지 않음", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		expect(onTypeChange).not.toHaveBeenCalled();
		expect(onGenreChange).not.toHaveBeenCalled();
	});

	it("유형과 장르를 각각 선택할 시, 각각 콜백이 호출된다.", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		const typeButton = screen.getByRole("button", { name: "액션" });
		const genreButton = screen.getByRole("button", { name: "대중음악" });

		fireEvent.click(typeButton);
		fireEvent.click(genreButton);

		expect(onTypeChange).toHaveBeenCalledWith("액션");
		expect(onGenreChange).toHaveBeenCalledWith("대중음악");
	});

});
