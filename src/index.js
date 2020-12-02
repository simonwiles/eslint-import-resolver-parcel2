import path from "path";
import fs from "fs";
import { isCore, sync as resolveSync } from "resolve";

const defaultExtensions = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".styl",
  ".vue",
];
export const interfaceVersion = 2;

function findAliases() {
  let currentPath = path.resolve();
  let packagePath = path.resolve(currentPath, "package.json");
  while (!fs.existsSync(packagePath)) {
    if (path.parse(currentPath).root === currentPath) {
      // reached the drive root; return an empty object
      return {};
    }
    currentPath = path.resolve(currentPath, "..");
    packagePath = path.resolve(currentPath, "package.json");
  }
  const packageJson = fs.readFileSync(packagePath);
  return JSON.parse(packageJson).alias || {};
}

function resolvePackageLevel(source, file, projectRoot) {
  let packageDirectory = path.dirname(file);

  for (;;) {
    if (fs.existsSync(path.resolve(packageDirectory, "node_modules"))) {
      // found node_modules
      break;
    } else if (path.parse(packageDirectory).root === packageDirectory) {
      // reached the drive root, just return null
      return null;
    }
    packageDirectory = path.resolve(packageDirectory, "..");
  }

  return path.join(
    // return projectRoot if it is nested inside the packageDirectory
    projectRoot.startsWith(packageDirectory) ? projectRoot : packageDirectory,
    // Get rid of the tilde
    source.slice(1),
  );
}

export function resolve(source, file, possibleConfig = {}) {
  if (isCore(source)) return { found: true, path: null };

  const config = { projectRoot: "", extensions: [], ...possibleConfig };

  const [startSource] = source.split("/");
  const aliases = findAliases();
  const foundAlias = Object.keys(aliases).find(
    (alias) => alias === startSource,
  );

  let newSource = source.replace(foundAlias, aliases[foundAlias]);

  const projectRoot = path.resolve(config.projectRoot);

  // this should probably strip off any named pipeline
  newSource = newSource.split(/^[^:]+:/).pop();

  switch (newSource[0]) {
    case ".":
      newSource = path.resolve(path.dirname(file), newSource);
      break;

    case "~":
      newSource = resolvePackageLevel(newSource, file, projectRoot);
      break;

    case "/":
      newSource = path.join(projectRoot, newSource);
      break;

    // no default
  }
  try {
    return {
      found: true,
      path: resolveSync(newSource, {
        basedir: path.resolve(),
        extensions: [...defaultExtensions, ...config.extensions],
      }),
    };
  } catch (_) {
    return { found: false };
  }
}
