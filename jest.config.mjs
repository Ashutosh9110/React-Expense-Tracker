export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-react"] }],
  },
  extensionsToTreatAsEsm: [".jsx"],
};
