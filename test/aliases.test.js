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
    global.deleteFolderRecursive(targetDir);

    expect(actual).toEqual(expected);
  });
});

describe("when aliases are unavailable", () => {
  const packagePath = path.resolve(path.resolve(), "package.json");
  const hiddenPackagePath = path.resolve(path.resolve(), "_package.json");

  beforeAll(() => {
    // hide package.json so that it can't be found by the findAliases function
    fs.renameSync(packagePath, hiddenPackagePath);
  });

  afterAll(() => {
    // restore package.json
    fs.renameSync(hiddenPackagePath, packagePath);
  });

  test("resolution completes appropriately when package.json does not specify aliases", () => {
    const source = "test-alias";
    const file = __filename;

    // temporarily create an empty package.json
    fs.writeFileSync(packagePath, "{}");

    const expected = { found: false };
    const actual = importResolver.resolve(source, file);

    // remove the empty package.json
    fs.unlinkSync(packagePath);

    expect(actual).toEqual(expected);
  });

  test("resolution completes appropriately when package.json is unavailable", () => {
    const source = "test-alias";
    const file = __filename;

    const expected = { found: false };
    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });
});
