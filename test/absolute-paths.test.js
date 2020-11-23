const fs = require("fs");
const path = require("path");

const { deleteFolderRecursive } = require("./utils");

const importResolver = require("../src");

// https://v2.parceljs.org/features/module-resolution/#absolute-paths
// "/foo resolves foo relative to the project root."

describe("absolute paths", () => {
  test("resolves /test/test-file.js successfully relative to automatically-discovered root directory", () => {
    const source = "/test/test-file";
    const file = __filename;

    // temporarily create an empty file for the resolver to find
    const targetPath = path.resolve(__dirname, "test-file.js");
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created file
    fs.unlinkSync(targetPath);

    expect(actual).toEqual(expected);
  });

  test("resolves /test-folder/test-file.js successfully relative to manually-specified root directory", () => {
    const source = "/test-folder/test-file";
    const file = __filename;
    const config = { projectRoot: "test" };

    // temporarily create folder with an empty file for the resolver to find
    const targetDir = path.resolve(__dirname, "test-folder");
    const targetPath = path.resolve(targetDir, "test-file.js");
    fs.mkdirSync(targetDir);
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file, config);

    // remove the created folder
    deleteFolderRecursive(targetDir);

    expect(actual).toEqual(expected);
  });
});
