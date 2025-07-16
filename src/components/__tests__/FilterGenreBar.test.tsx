/* 필터 UI (유형, 카테고리) */
import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "../ui/FilterBar.tsx";

describe("필터바에서 장르(Genre) 선택", () => {
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

	it("초기 렌더링 시, 어떤 장르도 선택하지 않음", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		expect(onGenreChange).not.toHaveBeenCalled();
	});

	it("다른 장르를 클릭하면 이전 선택 장르를 해제 후, 새로운 값으로 onGenreChange 호출", () => {
		const onTypeChange = jest.fn();
		const onGenreChange = jest.fn();

		render(
			<FilterBar onTypeChange={onTypeChange} onGenreChange={onGenreChange} />
		);

		const musicButton = screen.getByRole("button", { name: "대중음악" });
		const musicalButton = screen.getByRole("button", { name: "뮤지컬" });

		fireEvent.click(musicButton);
		expect(onGenreChange).toHaveBeenCalledWith("대중음악");

		fireEvent.click(musicalButton);
		expect(onGenreChange).toHaveBeenCalledWith("뮤지컬");

		fireEvent.click(musicalButton);
		expect(onGenreChange).toHaveBeenCalledWith(null);
	});
});
