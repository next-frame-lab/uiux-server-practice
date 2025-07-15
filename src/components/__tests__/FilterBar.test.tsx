/* 필터 UI (유형, 카테고리) */
import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "../ui/FilterBar.tsx";

describe("필터바에서 유형(Type) 또는 장르(Genre) 선택", () => {
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

	it("장르(genre) 버튼 클릭 시, onGenreChange 콜백이 호출", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		const genreButton = screen.getByRole("button", { name: "대중음악" });
		fireEvent.click(genreButton);

		expect(onGenreChange).toHaveBeenCalledWith("대중음악");
		expect(onTypeChange).not.toHaveBeenCalled();

		fireEvent.click(genreButton);
		expect(onGenreChange).toHaveBeenCalledWith(null);
	});
});
