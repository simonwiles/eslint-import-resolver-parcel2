const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

describe("imports without extensions", () => {
  const targetPath = path.resolve(__dirname, "typescript-file.ts");

  beforeAll(() => {
    // temporarily create an empty file for the resolver to find
    fs.writeFileSync(targetPath, "");
  });

  afterAll(() => {
    // remove the created file and folder
    fs.unlinkSync(targetPath);
  });

  test("fails to resolve .ts file without extensions supplied in config", () => {
    const source = "./typescript-file";
    const file = __filename;

    const expected = { found: false };
    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });

  test("resolves .ts file with extensions supplied in config", () => {
    const source = "./typescript-file";
    const file = __filename;
    const config = { extensions: [".ts"] };

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file, config);

    expect(actual).toEqual(expected);
  });
});
