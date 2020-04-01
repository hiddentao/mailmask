# Camomail

## Dev

Bootstrap the [monorepo](https://lerna.js.org/):

```shell
$ npm run bootstrap
```

At this point you can go into [individual packages](./packages) and test them out.

To create new package (note: if `folder_name` = `pkg1` then `name`
  in `pkg1/package.json` should be set to `@solui/pkg1`):

```shell
$ npm run lerna create <folder_name>
```

To add a new dependency to one of the packages:

```shell
node_modules/.bin/lerna add <npm pkg name> --scope=@solui/<pkg>
npm run bootstrap
```

## License

All Rights Reserved.
