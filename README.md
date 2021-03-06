# Mailmask

_Easily stop unwanted email_ - Unlimited, free temporary email addresses, all forwarding to your real email address.

For more information check out the website - https://msk.sh

To self-host Mailmask please follow the [self-hosted guide](https://github.com/hiddentao/mailmask/blob/master/docs/SelfHostingGuide.md).

## Development guide (for Mailmask devs)

Bootstrap the [monorepo](https://lerna.js.org/):

```shell
$ npm run bootstrap
```

At this point you can go into [individual packages](./packages) and test them out.

To create new package (note: if `folder_name` = `pkg1` then `name`
  in `pkg1/package.json` should be set to `@mailmask/pkg1`):

```shell
$ node_modules/.bin/lerna create <folder_name>
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

AGPL v3 - see [LICENSE.md](./LICENSE.md)
