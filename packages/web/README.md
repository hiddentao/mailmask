# Mailmask website (msk.sh)

This is the source code for [Mailmask](https://msk.sh) website, including the user dashboard.

This is built on top of [Next.js](https://nextjs.org/).

## Developer guide

Copy `.env.sample` to `.env.development` and enter the config variables into it as follows:

```
MAILER_API_KEY=...
ENCRYPTION_IV=...
ENCRYPTION_KEY=...
PADDLE_AUTH_CODE=...
```

_Note: Mailmask team members can fetch these secrets using: `gcloud secrets versions access latest --secret="mailmask-web-development" > .env`_

Now run:

```shell
yarn dev
```

To test production build locally:

```shell
yarn build
PORT=8080 yarn start
```

## Deploying to production

```shell
yarn deploy
```

## Release checklist (Mailmask devs only)

* Ensure monorepo packages are all published to NPM
* Run `yarn dev` locally and ensure everything works
* Run `yarn deploy` to deploy
* Visit https://msk.sh and check jaeger logs

