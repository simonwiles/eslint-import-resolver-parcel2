const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

describe("relative paths", () => {
  test("resolves ./test-file.js", () => {
    const source = "./test-file";
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

  test("resolves index.js from folder", () => {
    const source = "./test-folder";
    const file = __filename;

    // temporarily create folder with an empty file for the resolver to find
    const targetDir = path.resolve(__dirname, "test-folder");
    const targetPath = path.resolve(targetDir, "index.js");
    fs.mkdirSync(targetDir);
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created folder
    deleteFolderRecursive(targetDir);

    expect(actual).toEqual(expected);
  });
});
