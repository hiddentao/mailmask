#!/usr/bin/env bash

swaks --from hello@msk.sh --to ohyeah@test.msk.sh --server 127.0.0.1 --attach-type text/html --attach ./scripts/large.html  "$@"
