const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

// https://v2.parceljs.org/features/module-resolution/#tilde-paths
// "~/foo resolves foo relative to nearest node_modules directory, the nearest directory with
//   package.json or the project root - whichever comes first."

describe("tilde paths", () => {
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
