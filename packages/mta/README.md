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
MAILER_API_KEY=key-...
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
docker build --build-arg NPM_TOKEN=$NPM_TOKEN --tag mailmask-mta:latest .
```

### Run: terminal

```shell
docker run --publish 25:50025 -it --entrypoint /bin/bash mailmask-mta:latest
```


### Run: development (Mac)

`Db: postgresql://postgres:postgres@127.0.0.1:5432/mailmask-local`

```shell
docker run \
  --publish 25:50025 \
  --env DB_HOST=host.docker.internal \
  --env MAILER_API_KEY=...
  mailmask-mta \
  mailmask-mta:latest
```

To tail the log:

```shell
docker logs -f <id>
```

### Run: production

`Db: postgresql://<user>:<password>@<host>:<port>/mailmask-live`

```shell
docker run \
  --publish 25:50025 \
  --env APP_MODE=live \
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

## Other docker commands

To delete the container:

```shell
docker rm --force mailmask-mta
```

To delete the image:

```shell
docker rmi mailmask-mta:latest
```

To delete all dangling containers and images:

```shell
docker rm --force $(docker ps -aq)
docker rmi $(docker images -f "dangling=true" -q)
```


## Deployment to production

Setup terraform:

```shell
cd terraform
terraform init
```

Decrypt tfvars:

```shell
scripts/decrypt-vars.sh
```

Plan terraform:

```shell
terraform plan -var-file "secrets.tfvars.json"
```


Apply terraform:

```shell
terraform apply -var-file "secrets.tfvars.json"
```


Re-deploy droplet:

```shell
terraform taint digitalocean_droplet.mailmask-mta
terraform apply -var-file "secrets.tfvars.json"
```


Destroy it all and start again:

```shell
terraform destroy -var-file "secrets.tfvars.json"
```