const path = require("path");
const importResolver = require("../src");

describe("absolute paths", () => {
  // https://v2.parceljs.org/features/module-resolution/#absolute-paths
  test("resolves /test/test-file.js successfully relative to automatically-discovered root directory", () => {
    const source = "/test/test-file";
    const file = __filename;

    const expected = {
      found: true,
      path: path.resolve(__dirname, "test-file.js"),
    };

    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });

  test("resolves /test-folder/test-file.js successfully relative to manually-specified root directory", () => {
    const source = "/test-folder/test-file";
    const file = __filename;
    const config = { rootDir: "test" };

    const expected = {
      found: true,
      path: path.resolve(__dirname, "test-folder/test-file.js"),
    };

    const actual = importResolver.resolve(source, file, config);

    expect(actual).toEqual(expected);
  });
});
