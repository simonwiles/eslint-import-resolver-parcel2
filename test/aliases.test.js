const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

// https://v2.parceljs.org/features/module-resolution/#aliases
// "Aliases are supported through the alias field in package.json."

describe("aliases", () => {
  test("resolves simple alias from package.json", () => {
    const source = "test-alias";
    const file = __filename;

    const expected = {
      found: true,
      path: path.resolve(__dirname, "../node_modules/jest/build/jest.js"),
    };
    const actual = importResolver.resolve(source, file);
    expect(actual).toEqual(expected);
  });

  test("resolves folder alias successfully", () => {
    const source = "folder-alias/test-file.js";
    const file = __filename;

    // temporarily create folder with an empty file for the resolver to find
    const targetDir = path.resolve(__dirname, "test-folder");
    const targetPath = path.resolve(targetDir, "test-file.js");
    fs.mkdirSync(targetDir);
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created folder
    deleteFolderRecursive(targetDir);

    expect(actual).toEqual(expected);
  });
});
