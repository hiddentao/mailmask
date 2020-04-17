# Camomail

To run locally:

* Setup postgres db (`data` pkg)
* Start the MTA (`mta` pkg)
* Start the web app (`web` pkg)
* Enjoy!

## Lerna dev

Bootstrap the [monorepo](https://lerna.js.org/):

```shell
$ npm run bootstrap
```

At this point you can go into [individual packages](./packages) and test them out.

To create new package (note: if `folder_name` = `pkg1` then `name`
  in `pkg1/package.json` should be set to `@mailmask/pkg1`):

```shell
$ npm run lerna create <folder_name>
```

To add a new dependency to one of the packages:

```shell
node_modules/.bin/lerna add <npm pkg name> --scope=@mailmask/<pkg>
npm run bootstrap
```

## Publishing packages

_Ensure you're on master branch_

```shell
yarn pre-release
yarn release
```

## License

All Rights Reserved.
