[![npm Version](https://img.shields.io/npm/v/eslint-import-resolver-parcel2?logo=npm)](https://www.npmjs.com/package/eslint-import-resolver-parcel2)
[![Tests](https://github.com/simonwiles/eslint-import-resolver-parcel2/workflows/Tests/badge.svg)](https://github.com/simonwiles/eslint-import-resolver-parcel2/actions?query=workflow%3ATests)
[![License](https://img.shields.io/github/license/simonwiles/eslint-import-resolver-parcel2)](https://github.com/simonwiles/eslint-import-resolver-parcel2/blob/main/LICENSE)

# eslint-import-resolver-parcel2

Parcel import resolution plugin for [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import). This allows `eslint/import` to work with [module resolution in Parcel 2](https://v2.parceljs.org/features/module-resolution/).

This plugin is based on [ABuffSeagull/eslint-import-resolver-parcel](https://github.com/ABuffSeagull/eslint-import-resolver-parcel), but adds support for [non-code assets in Parcel 2](https://v2.parceljs.org/getting-started/migration/#importing-non-code-assets-from-javascript) and [named pipelines](https://v2.parceljs.org/configuration/plugin-configuration/#named-pipelines).

### Installing

Installation is with npm:

```
npm install -D eslint-import-resolver-parcel2
```

or yarn:

```
yarn add --dev eslint-import-resolver-parcel2
```

### Usage

Add this to your eslint config:

```js
settings: {
  "import/resolver": "parcel2"
}
```

See the [Parcel 2 documentation](https://v2.parceljs.org/features/module-resolution/) for details on how Parcel resolves dependencies -- this plugin is intended to follow this specification.

If migrating from Parcel 1 (`parceljs`), note that [Parcel 2 doesn't support glob file paths](https://github.com/parcel-bundler/parcel/issues/4683).

#### A Note on Absolute Paths

Absolute paths are resolved relative to the **project root**, which can depend on the entrypoint passed to Parcel. This plugin will use the folder where `eslint` is called from as the **project root** (which will be appropriate in most cases), but if you need to specify an alternative project root, you can do so in your eslint config:

```js
settings: {
  "import/resolver": {
    parcel: {
      projectRoot: "src" // wherever your entrypoints are located
    }
  }
}
```

#### Extensions

If an asset is imported without specifying a file extension, Parcel 2 will look for the following extensions in this order: `["ts", "tsx", "js", "jsx", "json", "css", "styl", "vue"]`. Other extensions need to be specified in full in the import statement. This plugin follows the same behaviour. If you are using a [custom resolver](https://v2.parceljs.org/plugin-system/resolver/), however, it may be convenient to add extensions to this list. This can be done in your `eslint` config by specifying a value for the `extensions` key:

```js
settings: {
  "import/resolver": {
    parcel: {
      extensions: [".svelte"]  // additional extensions to look for
    }
  }
}
```
