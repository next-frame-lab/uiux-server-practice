import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination.tsx";
import performanceData from "../../__mocks__/performanceData.ts";
import "@testing-library/jest-dom";

describe("Pagination 컴포넌트 테스트", () => {
	const mockPagination = performanceData.pagination;

	it("페이지 정보가 정확히 표시된다.", () => {
		render(<Pagination pagination={mockPagination} onPageChange={() => {}} />);
		expect(screen.getByText("Page 1 / 3")).toBeInTheDocument();
	});

	it("첫 페이지에서는 이전 버튼이 비활성화된다.", () => {
		const pagination = { ...mockPagination, page: 0, hasPrevious: false };
		render(<Pagination pagination={pagination} onPageChange={() => {}} />);
		expect(screen.getByRole("button", { name: "<" })).toBeDisabled();
	});

	it("마지막 페이지에서는 이후 버튼이 비활성화된다.", () => {
		const pagination = { ...mockPagination, page: 2, hasNext: false };
		render(<Pagination pagination={pagination} onPageChange={() => {}} />);
		expect(screen.getByRole("button", { name: ">" })).toBeDisabled();
	});

	it("이전 버튼 클릭 시, onPageChange가 호출된다.", () => {
		const mockFn = jest.fn();
		render(<Pagination pagination={mockPagination} onPageChange={mockFn} />);
		fireEvent.click(screen.getByRole("button", { name: "<" }));
		expect(mockFn).toHaveBeenCalledWith(mockPagination.page - 1);
	});

	it("이후 버튼 클릭 시, onPageChange가 호출된다.", () => {
		const mockFn = jest.fn();
		render(<Pagination pagination={mockPagination} onPageChange={mockFn} />);
		fireEvent.click(screen.getByRole("button", { name: ">" }));
		expect(mockFn).toHaveBeenCalledWith(mockPagination.page + 1);
	});
});
