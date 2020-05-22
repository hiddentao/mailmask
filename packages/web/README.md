# web

## Dev guide

We use Google App Engine for deployments and secrets management.

[Authenticate with Google APIs](https://cloud.google.com/docs/authentication/getting-started):

Now fetch dev environment secrets:

```shell
gcloud secrets versions access latest --secret="mailmask-web-development" > .env.development
```

Now run:

```shell
yarn dev
```

To test production build locally:

```shell
yarn build
PORT=8080 yarn start
```

## Deploy to production


```shell
gcloud auth application-default login
```

Now ensure the `NPM_TOKEN` env var is set properly.

Now run:

```shell
yarn deploy
```

## Storing secrets

Store secrets using [Google Cloud Secrets manager](https://cloud.google.com/secret-manager).

To set/get dev environment secrets:

```shell
gcloud secrets versions add "mailmask-web-development" --data-file="./.env.development"
gcloud secrets versions access latest --secret="mailmask-dev"
```

For set/get production secrets:

```shell
gcloud secrets versions add "mailmask-web-production" --data-file="./.env.production"
gcloud secrets versions access latest --secret="mailmask-live"
```

We created them using:

```shell
gcloud secrets create mailmask-web-developmentelopment --replication-policy="automatic"
gcloud secrets create mailmask-web-production --replication-policy="automatic"
```


## Release checklist

* Ensure monorepo packages are all published to NPM
* Run `yarn dev` locally and ensure everything works
* Run `yarn deploy` to deploy
* Visit https://msk.sh and check logs in https://jaeger2.hiddentao.com

