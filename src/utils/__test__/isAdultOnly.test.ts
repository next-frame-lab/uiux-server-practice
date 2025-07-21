import performanceData from "../../pages/__mocks__/performanceData.ts";
import isAdultOnly from "../isAdultOnly.ts";
import "@testing-library/jest-dom";

describe("성인 전용 판단 테스트", () => {
	it("성인 전용 공연일 경우, true를 반환한다.", () => {
		const mockPerformance = performanceData.performanceList[0];

		const adultPerformance = { ...mockPerformance, adultOnly: true };
		expect(isAdultOnly(adultPerformance)).toBe(true);
	});

	it("성인 전용 공연이 아닐 경우, false를 반환한다.", () => {
		const mockPerformance = performanceData.performanceList[0];

		const notAdultPerformance = { ...mockPerformance, adultOnly: false };
		expect(isAdultOnly(notAdultPerformance)).toBe(false);
	});
});
