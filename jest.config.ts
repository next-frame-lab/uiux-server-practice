// jest.config.ts
import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.app.json" }],
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;
