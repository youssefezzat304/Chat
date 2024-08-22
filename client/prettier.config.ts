/**@type {import("prettier").config} */
module.exports = {
  endOfLine: "crlf",
  semi: false,
  singleQute: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react)$",
    "",
    "<THIRD_PARTY_MODULES>",
    "/components/(.*)$",
    "",
    "^[.]",
  ],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
