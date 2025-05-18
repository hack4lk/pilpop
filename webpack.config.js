const path = require("path");

module.exports = {
  mode: "development", // or 'production' for optimized output
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: false, // Enable watch mode
};
