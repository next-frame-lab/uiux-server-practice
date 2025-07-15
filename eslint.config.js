import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default defineConfig([
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	...compat.extends("airbnb"),
	...compat.extends("plugin:@typescript-eslint/recommended"),
	...compat.extends("plugin:prettier/recommended"),
	...compat.extends("plugin:react/recommended"),
	...compat.extends("plugin:@tanstack/eslint-plugin-query/recommended"),
	prettier,
	{
		languageOptions: {
			globals: { ...globals.node, ...globals.jest },
			ecmaVersion: "latest",
		},
		rules: {
			// package import를 제외한 모든 import 구문에 대해 확장자를 사용하도록 강제
			"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
			"import/extensions": ["error", "ignorePackages"],
			"react/react-in-jsx-scope": "off",
			"react/jsx-filename-extension": [
				"warn",
				{ extensions: [".jsx", ".tsx"] },
			],
		},
	},

	{
		files: ["eslint.config.js", "vite.config.js"],
		rules: {
			"no-underscore-dangle": "off",
			"import/no-extraneous-dependencies": ["error", { packageDir: __dirname }],
		},
	},
]);
