const fs = require("fs");
const path = require("path");

const importResolver = require("../src");

describe("named pipelines", () => {
  test("resolves a resource specified with the url: pipeline", () => {
    const source = "url:./logo.svg";
    const file = __filename;

    // temporarily create an empty file for the resolver to find
    const targetPath = path.resolve(__dirname, "logo.svg");
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created file
    fs.unlinkSync(targetPath);

    expect(actual).toEqual(expected);
  });

  test("resolves a resource specified with the data-uri: pipeline", () => {
    const source = "data-uri:./logo.svg";
    const file = __filename;

    // temporarily create an empty file for the resolver to find
    const targetPath = path.resolve(__dirname, "logo.svg");
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created file
    fs.unlinkSync(targetPath);

    expect(actual).toEqual(expected);
  });

  test("resolves a resource specified with an arbitrary named pipeline", () => {
    const source = "arbitrary-pipeline:./logo.svg";
    const file = __filename;

    // temporarily create an empty file for the resolver to find
    const targetPath = path.resolve(__dirname, "logo.svg");
    fs.writeFileSync(targetPath, "");

    const expected = { found: true, path: targetPath };
    const actual = importResolver.resolve(source, file);

    // remove the created file
    fs.unlinkSync(targetPath);

    expect(actual).toEqual(expected);
  });
});
