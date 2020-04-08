# mta

## Dev

To run locally (with auto-reloading on file-save):

```shell
npm run dev
```

The server will be listening for SMTP connections on `localhost:50025`.

## Production

Ensure `.env` contains:

```
MAILGUN_API_KEY=key-...
APP_MODE=live
LOG_LEVEL=info
```

Then do:

```shell
npm start
```

## Docker

The docker container will copy your working tree (including `.env` settings) as is so you can test various different app
modes using Docker.

To build the image, first ensure the `NPM_TOKEN` env var is set correctly. Then do:

```shell
docker build --build-arg NPM_TOKEN=$NPM_TOKEN --tag camomail:latest .
```

### Run: development (Mac)

`Db: postgresql://postgres:postgres@127.0.0.1:5432/camomail-local`

```shell
docker run --publish 25:50025 --env DB_HOST=host.docker.internal --env MAILGUN_API_KEY=... --detach name camomail camomail:latest
```

### Run: production

`Db: postgresql://<user>:<password>@<host>:<port>/camomail-live`

```shell
docker run --publish 25:50025 --env APP_MODE=live --env DB_HOST=... --env DB_PORT=... --env DB_USERNAME=... --env DB_PASSWORD=... --env MAILGUN_API_KEY=... --detach name camomail camomail:latest
```

To delete the container:

```shell
docker rm --force mmk_mta
```

