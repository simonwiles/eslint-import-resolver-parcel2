const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

// https://v2.parceljs.org/features/module-resolution/#tilde-paths
// "~/foo resolves foo relative to nearest node_modules directory, the nearest directory with
//   package.json or the project root - whichever comes first."

describe("tilde paths relative to package-level node_modules dir", () => {
  const source = "~/package-level-test-file";

  const targetPath = path.resolve(
    __dirname,
    "..",
    "package-level-test-file.js",
  );

  beforeAll(() => {
    // temporarily create an empty file for the resolver to find
    fs.writeFileSync(targetPath, "");
  });

  afterAll(() => {
    // remove the created file and folder
    fs.unlinkSync(targetPath);
  });

  test("resolves ~/package-level-test-file.js", () => {
    const file = __filename;

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });

  test("resolves ~/package-level-test-file.js from within test folder", () => {
    const file = path.resolve(__dirname, "test-folder", "index.js");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });
});

describe("tilde paths relative to a nested node_modules dir", () => {
  test("resolves ~/test-file.js relative to test/node_modules", () => {
    const source = "~/test-file";
    const file = __filename;

    const nodeDirectory = path.resolve(__dirname, "node_modules");
    fs.mkdirSync(nodeDirectory);

    // temporarily create an empty file for the resolver to find
    const targetPath = path.resolve(__dirname, "test-file.js");
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created file and folder
    fs.unlinkSync(targetPath);
    fs.rmdirSync(nodeDirectory);

    expect(actual).toEqual(expected);
  });
});

describe("tilde paths relative to a manually-specified project root", () => {
  test("resolves the rootDir first", () => {
    const source = "~/test-file";
    const file = __filename;
    const config = { rootDir: "test/test-folder/" };

    // temporarily create folder with an empty file for the resolver to find
    const targetDir = path.resolve(__dirname, "test-folder");
    const targetPath = path.resolve(targetDir, "test-file.js");
    fs.mkdirSync(targetDir);
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file, config);

    // remove the created folder
    fs.rmdirSync(targetDir, { recursive: true });

    expect(actual).toEqual(expected);
  });
});
