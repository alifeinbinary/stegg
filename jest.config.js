/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: "jsdom",
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
            babelConfig: true,
        },
    },
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
};
