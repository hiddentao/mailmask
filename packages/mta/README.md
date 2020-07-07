# Mail Transfer Agent (MTA)

This is the MTA for [Mailmask](https://msk.sh). It is responsible for parsing incoming
emails and forwarding them to the corresponding Mailmask user.

This is built on top of [Haraka](https://haraka.github.io/).

## Development guide

Create `.env` and enter the config variables into it:

```
MAILER_API_KEY=...
ENCRYPTION_KEY=...
ENCRYPTION_IV=...
```

_Note: Mailmask team members can fetch these secrets using: `gcloud secrets versions access latest --secret="mailmask-web-development" > .env`_

## Run locally

To run locally (with auto-reloading on file-save):

```shell
npm run dev
```

The server will be listening for SMTP connections on `localhost:50025`.

## Docker

A Dockerfile is avaialable for building a Docker image. The docker build process will copy your working tree as is.

To build the image, do:

```shell
docker build --tag mailmask-mta:latest .
```

### Run: terminal

```shell
docker run --publish 25:50025 -it --entrypoint /bin/bash mailmask-mta:latest
```


### Run: development mode

Assuming db is at: `postgresql://postgres:postgres@127.0.0.1:5432/mailmask-local`

```shell
docker run \
  --publish 25:50025 \
  --env DB_HOST=host.docker.internal \
  --env MAILER_API_KEY=...
  --env ENCRYPTION_IV=...
  --env ENCRYPTION_KEY=...
  mailmask-mta \
  mailmask-mta:latest
```

### Run: production mode

`Db: postgresql://<user>:<password>@<host>:<port>/mailmask-live`

```shell
docker run \
  --publish 25:50025 \
  --env TRACE_CONSOLE_ENABLED=false \
  --env TRACE_CLOUD_ENDPOINT=... \
  --env DB_HOST=... \
  --env DB_PORT=... \
  --env DB_USERNAME=... \
  --env DB_PASSWORD=... \
  --env MAILER_API_KEY=... \
  --detach \
  mailmask-mta \
  mailmask-mta:latest
```

## Release checklist (Mailmask devs only)

* Ensure monorepo packages are all published to NPM
* Run dockerized MTA locally against dev db and check that it works
* Use terraform to _re-deploy_ the MTA
* Ensure everything is correct in DigitalOcean and Cloudflare
* Test out the live server and check jaeger logs

