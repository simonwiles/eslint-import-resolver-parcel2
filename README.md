[![Tests](https://github.com/simonwiles/eslint-import-resolver-parcel2/workflows/Tests/badge.svg)](https://github.com/simonwiles/eslint-import-resolver-parcel2/actions?query=workflow%3ATests)

# eslint-import-resolver-parcel2

Parcel import resolution plugin for [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import). This allows `eslint/import` to work with [module resolution in Parcel 2](https://v2.parceljs.org/features/module-resolution/).

This plugin is based on [ABuffSeagull/eslint-import-resolver-parcel](https://github.com/ABuffSeagull/eslint-import-resolver-parcel), but adds support for [non-code assets in Parcel 2](https://v2.parceljs.org/getting-started/migration/#importing-non-code-assets-from-javascript) and [named pipelines](https://v2.parceljs.org/configuration/plugin-configuration/#named-pipelines).
