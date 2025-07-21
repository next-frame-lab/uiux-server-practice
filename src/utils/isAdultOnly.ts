/**
 * 공연이 성인 전용 여부를 판단합니다.
 * @param performace 공연 정보
 * @returns 성인 전용이면, true, 아니면 false를 반환
 * */
import { PerformanceListItem } from "../pages/__mocks__/performanceData.ts";

export default function isAdultOnly(performace: PerformanceListItem): boolean {
	return performace.adultOnly;
}
