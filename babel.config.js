module.exports = {
  overrides: [
    {
      test: "src/client",
      presets: ["@vue/cli-plugin-babel/preset"],
    },
    {
      test: ".",
      exclude: ["node_modules", "dist", "public", "src/client"],
      presets: ["@babel/preset-typescript", ["@babel/preset-env"]],
    },
  ],
};
