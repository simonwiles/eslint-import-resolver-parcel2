const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

describe("imports non-default extensions", () => {
  const targetPath = path.resolve(__dirname, "svelte-file.svelte");

  beforeAll(() => {
    // temporarily create an empty file for the resolver to find
    fs.writeFileSync(targetPath, "");
  });

  afterAll(() => {
    // remove the created file
    fs.unlinkSync(targetPath);
  });

  test("fails to resolve .svelte file without extensions supplied in config", () => {
    const source = "./svelte-file";
    const file = __filename;

    const expected = { found: false };
    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });

  test("resolves .ts file with extensions supplied in config", () => {
    const source = "./svelte-file";
    const file = __filename;
    const config = { extensions: [".svelte"] };

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file, config);

    expect(actual).toEqual(expected);
  });

  test("resolves a .svelte file when specified with explicit extension", () => {
    const source = "./svelte-file.svelte";
    const file = __filename;

    // temporarily create an empty file for the resolver to find
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    expect(actual).toEqual(expected);
  });
});
