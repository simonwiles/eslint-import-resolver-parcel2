const importResolver = require("../src");

describe("core modules", () => {
  test("resolves a core module successfully", () => {
    const source = "fs";
    const file = __filename;

    const expected = { found: true, path: null };
    const actual = importResolver.resolve(source, file);
    expect(actual).toEqual(expected);
  });
});
